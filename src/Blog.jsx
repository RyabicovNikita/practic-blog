import { Route, Routes, useLocation } from "react-router";
import "./Blog.css";
import { Main, Header } from "./components";
import { Footer } from "./components/Footer/Footer";
import { useState } from "react";
import { ContextMenu } from "./components/ContextMenu/ContextMenu";
import { AuthForm } from "./components/AuthForm/AuthForm";

function Blog() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="app">
      <Header setIsMenuOpen={setIsMenuOpen} />
      {isMenuOpen && <ContextMenu setIsMenuOpen={setIsMenuOpen} />}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<AuthForm>SIGN IN</AuthForm>} />
        <Route path="/register" element={<AuthForm>SIGN UP</AuthForm>} />
        <Route path="/users" element={<div>Пользователи</div>} />
        <Route path="/post" element={<div>Новая статья</div>} />
        <Route path="/post/:postId" element={<div>Статья</div>} />
        <Route path="*" element={<div>Ошибка</div>} />
      </Routes>
      {location.pathname !== "/" && <Footer />}
    </div>
  );
}

export default Blog;
