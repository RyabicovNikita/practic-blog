import { useParams } from "react-router";
import { Comments } from "./components/Comments/Comments";
import { PostContent } from "./components/PostContent/PostContent";
import "./Post.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectPost } from "../../services/store/selectors/selectors";
import { POST_ACTION_TYPES } from "../../services/store/actions";
import { getPostById } from "../../api";
import { useEffect } from "react";

export const Post = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const post = useSelector(selectPost);
  useEffect(() => {
    getPostById(postId).then((post) => dispatch({ type: POST_ACTION_TYPES.GET_POST, payload: post }));
  }, []);
  return (
    <div className="blog">
      <PostContent post={post} />
      <Comments comments={post.comments} />
    </div>
  );
};
