import { useEffect, useRef, useState } from "react";
import { contentBack_img } from "../../../../images";
import { CardContainer, Scrollable, Section } from "../../styled-components";
import { getPosts, POSTS_ACTION_TYPES } from "../../../../services/store/actions";
import { useDispatch, useSelector } from "react-redux";
import { selectPosts } from "../../../../services/store/selectors/selectors";
import { BlogCard } from "../../../../components";
import { Footer } from "../Footer/Footer";
import { PAGINATION_LIMIT } from "../../../../services";

export const CardSection = ({ cardSectionRef }) => {
  const lastPostRef = useRef(null);
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const [page, setPage] = useState(1);
  const [isScrollToLast, setIsScrollToLast] = useState(false);
  const [pagesCount, setPagesCount] = useState(0);
  useEffect(() => {
    getPosts(page, PAGINATION_LIMIT).then((res) => {
      dispatch({ type: POSTS_ACTION_TYPES.GET_POSTS, payload: res.data });
      setPagesCount(res.paginationData.pages);
    });
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (lastPostRef.current) {
        const posTop = lastPostRef.current.getBoundingClientRect().top - 126;
        setIsScrollToLast(posTop + lastPostRef.current.clientHeight <= window.innerHeight && posTop >= 0);
      }
    };
    cardSectionRef.current.addEventListener("scroll", handleScroll);
  }, []);

  const observerLoader = useRef();

  useEffect(() => {
    if (observerLoader.current) {
      observerLoader.current.disconnect();
    }
    observerLoader.current = new IntersectionObserver(actionInSight);

    if (lastPostRef.current) {
      observerLoader.current.observe(lastPostRef.current);
    }
  }, [isScrollToLast]);

  const actionInSight = (entries) => {
    if (entries[0].isIntersecting && page < pagesCount) {
      setPage((prevState) => prevState + 1);
    }
  };
  return (
    <Section href={contentBack_img}>
      <Scrollable ref={cardSectionRef}>
        <CardContainer>
          {posts?.length > 0 &&
            posts.map((post, index) =>
              index + 1 === posts.length ? (
                <BlogCard post={post} key={post.id} lastPostRef={lastPostRef} />
              ) : (
                <BlogCard post={post} key={post.id} />
              )
            )}
        </CardContainer>
        <Footer />
      </Scrollable>
    </Section>
  );
};
