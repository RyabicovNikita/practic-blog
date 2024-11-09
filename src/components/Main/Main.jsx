import styled from "styled-components";
import { BlogCard } from "../BlogCard/BlogCard";
import { Footer } from "../Footer/Footer";
import "./Main.scss";

export const Main = () => {
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

  return (
    <main className="main-content">
      <Section className="main-content__section">
        <MainPageContainer>
          <TopHeader>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</TopHeader>
          <div className="main-content__arrow-container">
            <i class="fa fa-chevron-down drop-down-icon" aria-hidden="true"></i>
          </div>
        </MainPageContainer>
      </Section>
      <Section className="main-content__section cards-section">
        <div className="cards-section__scrollable-cards">
          <div className="cards-section__container">
            <BlogCard />
            <BlogCard />
          </div>
          <Footer />
        </div>
      </Section>
    </main>
  );
};
