import { Route, Routes, useLocation } from "react-router";
import "./Blog.css";

import { AuthForm } from "./pages/AuthForm/AuthForm";
import { Users } from "./pages/Users/Users";
import { Footer, Header } from "./pages/Main/components";
import { Main } from "./pages/Main/Main";
import { Post } from "./pages/Post/Post";

function Blog() {
  const location = useLocation();

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/auth" element={<AuthForm>SIGN IN</AuthForm>} />
        <Route path="/users" element={<Users />} />
        <Route path="/post" element={<div>Новая статья</div>} />
        <Route path="/post/:postId" element={<Post />} />
        <Route path="*" element={<div>Ошибка</div>} />
      </Routes>
      {location.pathname !== "/" && <Footer />}
    </div>
  );
}

export default Blog;
