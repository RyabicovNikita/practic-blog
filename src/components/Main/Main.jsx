import styled from "styled-components";
import { BlogCard } from "../BlogCard/BlogCard";
import { Footer } from "../Footer/Footer";
import { Link } from "react-router-dom";
import "./Main.scss";

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
  const Login = styled(Link)`
    padding: 15px;
    background-color: black;
    ${mainBRadius}
    width: 150px;
    color: white;
    text-align: center;
    text-decoration: none;
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
    gap: 50px;
  `;

  return (
    <main className="main-content">
      <Section className="main-content__section">
        <MainPageContainer>
          <TopHeader>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</TopHeader>
          <LoginForm>
            <input className="main-content__auth-input" placeholder="Login" />
            <input className="main-content__auth-input" placeholder="Password" />
            <Login to="/login">Login</Login>
          </LoginForm>
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
