import styled from "styled-components";
import { CardSection, MainSection } from "./components";
import { useRef } from "react";
import "./Main.scss";

const Main = styled.main`
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
`;

export const MainContainer = () => {
  const cardSectionRef = useRef();
  const handleScrollDownClick = () => {
    cardSectionRef.current.scrollIntoView();
  };
  return (
    <Main>
      <MainSection scrollDownClick={handleScrollDownClick} />
      <CardSection cardSectionRef={cardSectionRef} />
    </Main>
  );
};
