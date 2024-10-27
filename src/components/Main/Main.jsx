import styled from "styled-components";
import { BlogCard } from "../BlogCard/BlogCard";
import { Footer } from "../Footer/Footer";

export const Main = () => {
  const flexToCenter = {
    display: "flex",
    "align-items": "center",
    "justify-content": "center",
  };
  const mainBRadius = {
    "border-radius": "15px",
  };

  const InputField = styled.input`
    padding: 15px;
    background-color: #2f2d2dc2;
    ${mainBRadius}
    width: 400px;
    color: white;
    font-family: "Elite";
    font-size: 25px;
  `;
  const Login = styled.a`
    padding: 15px;
    background-color: black;
    ${mainBRadius}
    width: 150px;
    color: white;
    text-align: center;
  `;
  const LoginForm = styled.div`
    ${flexToCenter}
    gap: 35px;
  `;
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
  `;

  const MainPageContainer = styled.div`
    ${flexToCenter}
    flex-direction:column;
    gap: 50px;
  `;
  return (
    <main className="mainBlock">
      <Section className="block">
        <MainPageContainer>
          <TopHeader>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</TopHeader>
          <LoginForm>
            <InputField />
            <InputField />
            <Login>Login</Login>
          </LoginForm>
        </MainPageContainer>
      </Section>
      <Section className="block block2">
        <div className="container">
          <div className="card-container">
            <BlogCard />
            <BlogCard />
          </div>
          <Footer />
        </div>
      </Section>
    </main>
  );
};
