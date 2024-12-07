import * as yup from "yup";
import { useEffect, useState } from "react";
import { Comment } from "./components/Comment/Comment";
import { useDispatch, useSelector } from "react-redux";
import { selectComments, selectPost, selectUser } from "../../../../services/store/selectors/selectors";

import { addNewComment, deleteComment } from "../../../../services/store/actions";
import { ContextMenu, Error } from "../../../../components";

import "./Comments.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ROLES } from "../../../../services";
const shapeObject = {
  comment: yup
    .string()
    .min(10, "Минимальный размер комментария - 10 символов.")
    .max(1000, "Длина символов в комментарии не может превышать 1000 символов."),
};

export const Comments = () => {
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [deletedCommentID, setDeletedCommentID] = useState(null);
  const [points, setPoints] = useState({
    x: 0,
    y: 0,
  });
  const authFormSchema = yup.object().shape(shapeObject);
  const formParams = {
    defaultValues: {
      comment: "",
    },
    resolver: yupResolver(authFormSchema),
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm(formParams);

  const [accessError, setAccessError] = useState(null);
  const { id: postId } = useSelector(selectPost);
  const user = useSelector(selectUser);
  const comments = useSelector(selectComments);
  const dispatch = useDispatch();

  const onSubmit = ({ comment }) => {
    if (!user.id) {
      setAccessError("Только авторизированные пользователи могут оставлять комментарии.");
      setTimeout(() => setAccessError(null), 3000);
      return;
    }
    dispatch(addNewComment(user, postId, comment));
    reset();
  };

  useEffect(() => {
    const handleClick = () => setIsContextMenuOpen(false);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  const handleContextMenu = (e, commentID) => {
    if (user.role_id !== ROLES.ADMIN) return;
    setDeletedCommentID(commentID);
    e.preventDefault();
    setIsContextMenuOpen(true);
    setPoints({
      x: e.pageX,
      y: e.pageY,
    });
  };
  const actions = [
    {
      name: "Удалить комментарий",
      onClick: () => dispatch(deleteComment(deletedCommentID)),
    },
  ];
  return (
    <div className="comments">
      <form onSubmit={handleSubmit(onSubmit)} className="comments__new-comment">
        <div className="comments__input-container">
          <textarea
            className="comments__comment"
            type="text"
            name="input-comment"
            placeholder="Комментарий..."
            {...register("comment", {
              onChange: () => setAccessError(null),
            })}
          ></textarea>
          <button className="comments__add-comment">
            <i className="fa fa-paper-plane comments__add-comment-icon" aria-hidden="true"></i>
          </button>
        </div>
        {(errors?.comment?.message || accessError) && (
          <div className="comments__error-window">
            <Error>{errors?.comment?.message || accessError}</Error>
          </div>
        )}
      </form>
      <div className="comments__container">
        {isContextMenuOpen && <ContextMenu top={points.y} left={points.x} actions={actions} />}
        {comments &&
          comments.map(({ id, author_login, content, published_at }) => (
            <Comment
              onContextMenu={handleContextMenu}
              key={id}
              id={id}
              author_login={author_login}
              content={content}
              published_at={published_at}
            />
          ))}
      </div>
    </div>
  );
};
