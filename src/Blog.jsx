import "./Blog.css";
import { BlogCard } from "./components/BlogCard/BlogCard";
import { Header } from "./components/Header/Header";
import {
  Field,
  Login,
  LoginForm,
  MainPageContainer,
  Section,
  TopHeader,
} from "./components/styled-components/styled-components";

function Blog() {
  return (
    <div className="app">
      <Header />
      <main className="mainBlock">
        <Section className="block">
          <MainPageContainer>
            <TopHeader>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</TopHeader>
            <LoginForm>
              <Field />
              <Field />
              <Login>Login</Login>
            </LoginForm>
          </MainPageContainer>
        </Section>
        <Section className="block block2">
          <div className="container">
            <div className="card-container">
              <BlogCard />
              <BlogCard />
              <BlogCard />
              <BlogCard />
              <BlogCard />
              <BlogCard />
              <BlogCard />
              <BlogCard />
              <BlogCard />
              <BlogCard />
              <BlogCard />
              <BlogCard />
              <BlogCard />
              <BlogCard />
              <BlogCard />
              <BlogCard />
              <BlogCard />
              <BlogCard />
              <BlogCard />
              <BlogCard />
              <BlogCard />
              <BlogCard />
              <BlogCard />
              <BlogCard />
              <BlogCard />
              <BlogCard />
              <BlogCard />
              <BlogCard />
              <BlogCard />
            </div>
            <footer className="footer">
              <p>Никита Рябиков, 2024</p>
            </footer>
          </div>
        </Section>
      </main>
    </div>
  );
}

export default Blog;
