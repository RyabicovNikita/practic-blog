import { useParams } from "react-router";
import { Comments } from "./components/Comments/Comments";
import { PostContent } from "./components/PostContent/PostContent";
import "./Post.scss";
import { useDispatch } from "react-redux";
import { getPost, POST_ACTION_TYPES } from "../../services/store/actions";
import { useEffect } from "react";

export const Post = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    getPost(postId).then((post) => dispatch({ type: POST_ACTION_TYPES.GET_POST, payload: post }));
  }, []);

  return (
    <div className="blog">
      <PostContent />
      <Comments />
    </div>
  );
};
