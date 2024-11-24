import { useState } from "react";
import { Comment } from "./components/Comment/Comment";
import { useDispatch, useSelector } from "react-redux";
import { selectComments, selectPost, selectUser } from "../../../../services/store/selectors/selectors";

import { addNewComment } from "../../../../services/store/actions";
import { Error } from "../../../../components";

import "./Comments.scss";

export const Comments = () => {
  const [error, setError] = useState(null);
  const { id: postId } = useSelector(selectPost);
  const user = useSelector(selectUser);
  const comments = useSelector(selectComments);
  const dispatch = useDispatch();

  const handleSubmit = (formData) => {
    const comment = formData.get("input-comment");
    if (!comment) return;
    if (comment.length > 1000) {
      setError("Длина символов в комментарии не может превышать 1000 символов.");
      return;
    } else setError(null);
    if (!user.id) {
      setError("Только авторизированные пользователи могут оставлять комментарии.");
      setTimeout(() => setError(null), 3000);
      return;
    } else setError(null);
    dispatch(addNewComment(user, postId, comment));
  };
  return (
    <div className="comments">
      <form action={handleSubmit} className="comments__new-comment">
        <div className="comments__input-container">
          <textarea
            className="comments__comment"
            type="text"
            name="input-comment"
            placeholder="Комментарий..."
          ></textarea>
          <button className="comments__add-comment">
            <i className="fa fa-paper-plane comments__add-comment-icon" aria-hidden="true"></i>
          </button>
        </div>
        {error && (
          <div className="comments__error-window">
            <Error>{error}</Error>
          </div>
        )}
      </form>
      <div className="comments__container">
        {comments &&
          comments.map(({ id, author_login, content, published_at }) => (
            <Comment key={id} id={id} author_login={author_login} content={content} published_at={published_at} />
          ))}
      </div>
    </div>
  );
};
