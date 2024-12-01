import { useLayoutEffect, useRef } from "react";
import "./NewPost.scss";
import { MIN_HEIGTH_POST } from "../../../services";
import { usePostState } from "../../../hooks";
import { useDispatch } from "react-redux";
import { createNewPost } from "../../../services/store/actions";
import { useNavigate } from "react-router";

const shapeObject = {};

export const NewPost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const contentRef = useRef(null);
  const { getPost, updatePost } = usePostState();
  const post = getPost();
  useLayoutEffect(() => {
    if (post.content) {
      contentRef.current.style.height = "inherit";
      contentRef.current.style.height = `${Math.min(contentRef.current.scrollHeight, MIN_HEIGTH_POST)}px`;
    }
  }, [post.content]);

  const handleSave = () => {
    dispatch(createNewPost(post)).then(({ payload }) => navigate(`/post/${payload.id}`));
  };

  return (
    <section className="blog">
      <section className="blog__top-content">
        <img alt="" className="blog__main-image" src={post.image_url}></img>
        <input
          className="blog__input-url"
          placeholder="Введите URL картинки"
          onChange={({ target }) => updatePost(target.value, "image_url")}
        ></input>
        <input
          placeholder="Введите  заголовок статьи"
          value={post.title}
          onChange={({ target }) => updatePost(target.value, "title")}
          className="blog__title-input"
        ></input>
      </section>

      <div className="blog__actions">
        <div className="blog__action-container" onClick={handleSave}>
          <i className="fa fa-floppy-o blog__save" aria-hidden="true"></i>
        </div>
      </div>

      <section className="blog__main-content">
        <textarea
          ref={contentRef}
          placeholder="Введите содержание статьи"
          value={post.content}
          onChange={({ target }) => updatePost(target.value, "content")}
          className="blog__edit-content"
        />
      </section>
    </section>
  );
};
