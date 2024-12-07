import { useDispatch, useSelector } from "react-redux";
import "./PostContent.scss";
import { selectPost, selectUser } from "../../../../services/store/selectors/selectors";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { fetchSavePost } from "../../../../api";
import { POST_ACTION_TYPES } from "../../../../services/store/actions";
import { MIN_HEIGTH_POST } from "../../../../services";
import { useForm } from "react-hook-form";
import { Error } from "../../../../components/Error/Error";
import { getPostFormParams } from "../../validates";

export const PostContent = ({ setIsModalOpen }) => {
  const [serverError, setServerError] = useState(null);
  const deleteServerErrorIfNeed = () => {
    if (serverError !== null) setServerError(null);
  };
  const contentRef = useRef(null);
  const dispatch = useDispatch();
  const post = useSelector(selectPost);

  const {
    register,
    unregister,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm(getPostFormParams({ image_url: "" }));

  const { role_id } = useSelector(selectUser);

  const { image_url, published_at, content, title } = post;

  const [isEditPost, setIsEditPost] = useState(false);

  const registerInputs = (isInit = true) => {
    if (isInit) {
      register("title", { value: title });
      register("content", { value: content });
      register("image_url", { value: image_url });
    } else {
      unregister("title");
      unregister("content");
      unregister("image_url");
    }
  };

  const postValue = getValues();

  useEffect(() => {
    if (post?.content?.length > 0 && post?.title?.length > 0) {
      registerInputs(true);
    }
    return () => registerInputs(false);
  }, [post.content, post.title]);

  useLayoutEffect(() => {
    if (postValue.content) {
      contentRef.current.style.height = "inherit";
      contentRef.current.style.height = `${Math.max(contentRef.current.scrollHeight, MIN_HEIGTH_POST)}px`;
    }
  }, [postValue.content]);

  const handleDelete = () => {
    setIsModalOpen(true);
    deleteServerErrorIfNeed();
  };

  const onSubmit = () => {
    if (isEditPost === false) setIsEditPost(true);
    else {
      try {
        fetchSavePost(post.id, postValue).then((newPost) => {
          dispatch({ type: POST_ACTION_TYPES.UPDATE_POST, payload: newPost });
          setIsEditPost(false);
          deleteServerErrorIfNeed();
        });
      } catch (error) {
        setServerError(error);
      }
    }
  };

  const titleError = errors?.title?.message;
  const contentError = errors?.content?.message;

  const onValidateChange = ({ target }) => {
    deleteServerErrorIfNeed();
    setValue(target.name, target.value, { shouldDirty: false, shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className="blog__top-content">
        <img alt="" className="blog__main-image" src={postValue.image_url}></img>
        {isEditPost && (
          <input
            name="image_url"
            className="blog__input-url"
            placeholder="Введите URL картинки"
            value={postValue.image_url}
            onChange={onValidateChange}
          />
        )}
        <div
          className={isEditPost ? "blog__title edit" : "blog__title"}
          style={{ borderColor: titleError ? "red" : "white" }}
        >
          <input
            name="title"
            className="blog__text-title"
            value={postValue.title}
            disabled={!isEditPost}
            onChange={onValidateChange}
          />
          <div className="blog__date-container">
            <span className="blog__date">{published_at}</span>
          </div>
        </div>
        {titleError && <Error>{titleError}</Error>}
      </section>
      {role_id !== 3 && (
        <div className="blog__blog-content">
          <div className="blog__actions">
            <div className="blog__actions-container">
              <i className="fa fa-trash blog__delete" onClick={handleDelete} aria-hidden="true"></i>
              <button className="blog__post-submit" type="submit">
                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      )}
      <section className="blog__main-content">
        <textarea
          name="content"
          className={isEditPost ? "blog__edit-content edit" : "blog__content"}
          style={{ borderColor: contentError ? "red" : "white" }}
          ref={contentRef}
          disabled={!isEditPost}
          value={postValue.content}
          onChange={onValidateChange}
        />
        {contentError && <Error>{contentError}</Error>}
      </section>
    </form>
  );
};
