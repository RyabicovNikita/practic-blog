import { Route, Routes, useLocation } from "react-router";
import "./Blog.css";

import { AuthForm } from "./pages/AuthForm/AuthForm";
import { Users } from "./pages/Users/Users";
import { Footer, Header } from "./pages/Main/components";
import { Main } from "./pages/Main/Main";
import { Post } from "./pages/Post/Post";
import { NewPost } from "./pages/Post/NewPost/NewPost";
import { useSelector } from "react-redux";
import { selectUserRole } from "./services/store/selectors/selectors";
import { ROLES } from "./services";
import { Error } from "./components";

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
        <Route path="*" element={<div>Ошибка</div>} />
      </Routes>
      {location.pathname !== "/" && <Footer />}
    </div>
  );
}

export default Blog;
