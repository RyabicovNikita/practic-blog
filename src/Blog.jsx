import { Route, Routes, useLocation } from "react-router";
import "./Blog.css";

import { AuthForm } from "./pages/AuthForm/AuthForm";
import { Users } from "./pages/Users/Users";
import { Footer, Header } from "./pages/Main/components";
import { Main } from "./pages/Main/Main";

import { useSelector } from "react-redux";
import { selectUserRole } from "./services/store/selectors/selectors";
import { ROLES } from "./services";
import { Error } from "./components";
import { NewPost, Post } from "./pages/Post";
import { NotFound } from "./pages/NotFound/NotFound";

function Blog() {
  const location = useLocation();
  const userRoleID = useSelector(selectUserRole);
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/auth" element={<AuthForm>SIGN IN</AuthForm>} />
        <Route path="/users" element={<Users />} />
        <Route path="/post" element={userRoleID === ROLES.ADMIN ? <NewPost /> : <Error>Ошибка доступа</Error>} />
        <Route path="/post/:postId" element={<Post />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {location.pathname !== "/" && <Footer />}
    </div>
  );
}

export default Blog;
