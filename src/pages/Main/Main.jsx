import styled from "styled-components";
import { BlogCard } from "../../components/BlogCard/BlogCard";
import { Footer } from "./components/Footer/Footer";
import { useEffect, useRef } from "react";
import { getPosts } from "../../api";
import { useDispatch, useSelector } from "react-redux";

import "./Main.scss";
import { selectPosts } from "../../services/store/selectors/selectors";
import { POSTS_ACTION_TYPES } from "../../services/store/actions";

export const Main = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const ref = useRef();

  const flexToCenter = {
    display: "flex",
    "align-items": "center",
    "justify-content": "center",
  };
  const TopHeader = styled.h1`
    padding: 0;
    margin: 0;
    margin-top: 10%;
  `;

  const Section = styled.section`
    height: 120%;
    width: 100%;
    text-align: center;
    scroll-snap-align: start;
    scroll-snap-stop: always;
    position: relative;
    width: 100%;
    text-align: center;
    scroll-snap-align: start;
    scroll-snap-stop: always;
  `;

  const MainPageContainer = styled.div`
    ${flexToCenter}
    height: 70%;
    flex-direction: column;
    gap: 350px;
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

  const handleScrollDownClick = () => {
    ref.current.scrollIntoView();
  };

  useEffect(() => {
    getPosts().then((posts) => dispatch({ type: POSTS_ACTION_TYPES.GET_POSTS, payload: posts }));
  }, []);

  return (
    <main className="main-content">
      <Section className="main-content__section">
        <MainPageContainer>
          <TopHeader>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</TopHeader>
          <div className="main-content__arrow-container">
            <i
              className="fa fa-chevron-down drop-down-icon"
              aria-hidden="true"
              style={{ cursor: "pointer" }}
              onClick={handleScrollDownClick}
            ></i>
          </div>
        </MainPageContainer>
      </Section>
      <Section className="main-content__section cards-section">
        <div className="cards-section__scrollable-cards" ref={ref}>
          <CardContainer>
            {posts?.length > 0 && posts.map((post) => <BlogCard post={post} key={post.id} />)}
          </CardContainer>
          <Footer />
        </div>
      </Section>
    </main>
  );
};
