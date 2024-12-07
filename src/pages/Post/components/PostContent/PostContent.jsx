import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import "./PostContent.scss";
import { selectPost, selectUser } from "../../../../services/store/selectors/selectors";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { fetchSavePost } from "../../../../api";
import { POST_ACTION_TYPES } from "../../../../services/store/actions";
import { MIN_HEIGTH_POST } from "../../../../services";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Error } from "../../../../components/Error/Error";

const shapeObject = {
  title: yup
    .string()
    .required("Заголовок является обязательным для заполнения")
    .min(10, "Минимальная длина заголовока - 10 символов")
    .max(23, "Максимальная длина заголовока - 23 символа"),
  content: yup
    .string()
    .required("Заполните содержание статьи")
    .min(100, "Минимальная длина статьи - 100 символов")
    .max(2000, "Максимальная длина статьи - 2000 символов"),
};

export const PostContent = ({ setIsModalOpen }) => {
  const [serverError, setServerError] = useState(null);
  const deleteServerErrorIfNeed = () => {
    if (serverError !== null) setServerError(null);
  };
  const contentRef = useRef(null);
  const dispatch = useDispatch();
  const post = useSelector(selectPost);
  // const [postState, setPostState] = useState({});
  const formSchema = yup.object().shape(shapeObject);

  const formParams = {
    defaultValues: {
      title: "",
      content: "",
    },
    resolver: yupResolver(formSchema),
  };

  const {
    register,
    unregister,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm(formParams);

  const { role_id } = useSelector(selectUser);

  const { image_url, published_at, content, title } = post;

  const [isEditPost, setIsEditPost] = useState(false);

  const registerInputs = (isInit = true) => {
    if (isInit) {
      register("title", { value: title });
      register("content", { value: content });
    } else {
      unregister("title");
      unregister("content");
    }
  };

  const postValue = getValues();

  useEffect(() => {
    if (post.content && post.title) {
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
          dispatch({ type: POST_ACTION_TYPES.UPDATE_POST, payload: newPost.content });
          setIsEditPost(false);
          deleteServerErrorIfNeed();
        });
      } catch (error) {
        setServerError(error);
      }
    }
  };

  const formError = errors?.title?.message || errors?.content?.message;

  const errorMessage = formError || serverError;

  const onValidateChange = ({ target }) => {
    deleteServerErrorIfNeed();
    setValue(target.name, target.value, { shouldDirty: false, shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className="blog__top-content">
        {image_url && <img alt="" className="blog__main-image" src={image_url}></img>}
        <div className="blog__title">
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
      {errorMessage && <Error className={"blog__edit-error"}>{errorMessage}</Error>}
      <section className="blog__main-content">
        <textarea
          name="content"
          className={isEditPost ? "blog__edit-content" : "blog__content"}
          ref={contentRef}
          disabled={!isEditPost}
          value={postValue.content}
          onChange={onValidateChange}
        />
      </section>
    </form>
  );
};
