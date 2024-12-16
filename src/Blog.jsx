import { Route, Routes, useLocation } from "react-router";
import "./Blog.css";

import { AuthForm } from "./pages/AuthForm/AuthForm";

import { Footer, HeaderContainer } from "./pages/Main/components";

import { useSelector } from "react-redux";
import { selectUserRole } from "./services/store/selectors/selectors";
import { ROLES } from "./services";
import { Error } from "./components";
import { NewPost, Post } from "./pages/Post";
import { MainContainer } from "./pages/Main";
import { Error404, Users } from "./pages";

function Blog() {
  const location = useLocation();
  const userRoleID = useSelector(selectUserRole);
  return (
    <div className="app">
      <HeaderContainer />
      <Routes>
        <Route path="/" element={<MainContainer />} />
        <Route path="/auth" element={<AuthForm>SIGN IN</AuthForm>} />
        <Route path="/users" element={<Users />} />
        <Route path="/post" element={userRoleID === ROLES.ADMIN ? <NewPost /> : <Error>Ошибка доступа</Error>} />
        <Route path="/post/:postId" element={<Post />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      {location.pathname !== "/" && <Footer />}
    </div>
  );
}

export default Blog;
