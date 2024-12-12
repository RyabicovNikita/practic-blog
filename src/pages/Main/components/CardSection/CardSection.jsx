import { forwardRef, useEffect } from "react";
import { contentBack_img } from "../../../../images";
import { Section } from "../../styled-components";
import styled from "styled-components";
import { getPosts, POSTS_ACTION_TYPES } from "../../../../services/store/actions";
import { useDispatch, useSelector } from "react-redux";
import { selectPosts } from "../../../../services/store/selectors/selectors";
import { BlogCard } from "../../../../components";
import { Footer } from "../Footer/Footer";

const ScrollableContainer = forwardRef(({ className, children, ...props }, ref) => (
  <div className={className} {...props} ref={ref}>
    {children}
  </div>
));

const Scrollable = styled(ScrollableContainer)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 30px;
  height: 100%;
  overflow-y: scroll;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, calc(33.3333333% - 20px)));
  grid-gap: 20px;
  padding-left: 25px;
  padding-right: 25px;
  box-sizing: border-box;
  justify-content: center;
`;

export const CardSection = ({ cardSectionRef }) => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  useEffect(() => {
    getPosts().then((posts) => dispatch({ type: POSTS_ACTION_TYPES.GET_POSTS, payload: posts }));
  }, []);
  return (
    <Section href={contentBack_img}>
      <Scrollable ref={cardSectionRef}>
        <CardContainer>{posts?.length > 0 && posts.map((post) => <BlogCard post={post} key={post.id} />)}</CardContainer>
        <Footer />
      </Scrollable>
    </Section>
  );
};
