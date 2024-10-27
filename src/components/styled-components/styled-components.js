import styled from "styled-components";
const flexToCenter = {
  display: "flex",
  "align-items": "center",
  "justify-content": "center",
};
const mainBRadius = {
  "border-radius": "15px",
};

export const Field = styled.input`
  padding: 15px;
  background-color: #2f2d2dc2;
  ${mainBRadius}
  width: 400px;
  color: white;
  font-family: "Elite";
  font-size: 25px;
`;
export const Login = styled.a`
  padding: 15px;
  background-color: black;
  ${mainBRadius}
  width: 150px;
  color: white;
  text-align: center;
`;
export const LoginForm = styled.div`
  ${flexToCenter}
  gap: 35px;
`;
export const TopHeader = styled.h1`
  padding: 0;
  margin: 0;
  margin-top: 10%;
`;

export const Section = styled.section`
  height: 120%;
  width: 100%;
  text-align: center;
  scroll-snap-align: start;
  scroll-snap-stop: always;
`;

export const MainPageContainer = styled.div`
  ${flexToCenter}
  flex-direction:column;
  gap: 50px;
`;
