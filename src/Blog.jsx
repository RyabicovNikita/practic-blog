import { Route, Routes } from "react-router";
import "./Blog.css";
import { Main, Header } from "./components";
import { Footer } from "./components/Footer/Footer";

function Blog() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<div>Страница входа</div>} />
        <Route path="/register" element={<div>Страница регистрации</div>} />
        <Route path="/users" element={<div>Пользователи</div>} />
        <Route path="/post" element={<div>Новая статья</div>} />
        <Route path="/post/:postId" element={<div>Статья</div>} />
        <Route path="*" element={<div>Ошибка</div>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default Blog;
