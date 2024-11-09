import { Route, Routes, useLocation } from "react-router";
import "./Blog.css";
import { Main, Header } from "./components";
import { Footer } from "./components/Footer/Footer";
import { AuthForm } from "./pages/AuthForm/AuthForm";

function Blog() {
  const location = useLocation();

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/auth" element={<AuthForm>SIGN IN</AuthForm>} />
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
