import styled from "styled-components";
import { CardSection, MainSection } from "./components";
import { useRef } from "react";
const Main = styled.main`
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  @keyframes key-down-move {
    0% {
      top: 0;
    }
    100% {
      top: 100%;
    }
  }
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
