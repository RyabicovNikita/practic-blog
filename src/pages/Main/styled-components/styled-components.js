import styled from "styled-components";

export const flexToCenter = {
  display: "flex",
  "align-items": "center",
  "justify-content": "center",
};

export const Section = styled.section`
  height: 120%;
  width: 100%;
  text-align: center;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  position: relative;
  background-image: url(${({ href }) => href});
  background-size: cover;
  background-origin: border-box;
  background-position: top;
`;
