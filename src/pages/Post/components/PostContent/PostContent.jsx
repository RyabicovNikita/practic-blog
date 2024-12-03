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
    .max(50, "Максимальная длина заголовока - 50 символов"),
  content: yup
    .string()
    .required("Заполните содержание статьи")
    .min(100, "Минимальная длина статьи - 100 символов")
    .max(2000, "Максимальная длина статьи - 2000 символов"),
};

export const PostContent = ({ setIsModalOpen }) => {
  const [serverError, setServerError] = useState(null);
  const contentRef = useRef(null);
  const dispatch = useDispatch();
  const post = useSelector(selectPost);
  const [postState, setPostState] = useState(post);
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
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm(formParams);

  const { role_id } = useSelector(selectUser);

  const { content, image_url, published_at, title } = post;

  const [currentContent, setCurrentContent] = useState("");
  const [isEditPost, setIsEditPost] = useState(false);

  useLayoutEffect(() => {
    if (currentContent) {
      contentRef.current.style.height = "inherit";
      contentRef.current.style.height = `${Math.max(contentRef.current.scrollHeight, MIN_HEIGTH_POST)}px`;
    }
  }, [currentContent]);

  useEffect(() => {
    setCurrentContent(content);
  }, [content]);

  const handleDelete = () => {
    setIsModalOpen(true);
    setServerError(null);
  };

  const onSubmit = () => {
    if (isEditPost === false) setIsEditPost(true);
    else {
      try {
        fetchSavePost(post.id, currentContent).then((newPost) => {
          dispatch({ type: POST_ACTION_TYPES.UPDATE_POST, payload: newPost.content });
          setIsEditPost(false);
          setServerError(null);
        });
      } catch (error) {
        setServerError(error);
      }
    }
  };

  const formError = errors?.title?.message || errors?.content?.message;

  const errorMessage = formError || serverError;

  const getRegisterProps = (name, value, onChange) => {
    if (!isEditPost) return {};
    return {
      ...register(name, {
        value: value,
        onChange: onChange,
      }),
    };
  };

  const handleTitleChange = ({ target }) => {
    setServerError(null);
    setPostState((prevState) => ({ ...prevState, title: target.value }));
  };

  return (
    <>
      <section className="blog__top-content">
        {image_url && <img alt="" className="blog__main-image" src={image_url}></img>}
        <div className="blog__title">
          <input
            name="title"
            className="blog__text-title"
            disabled={!isEditPost}
            {...getRegisterProps("title", postState, handleTitleChange)}
          />
          <div className="blog__date-container">
            <span className="blog__date">{published_at}</span>
          </div>
        </div>
      </section>
      {role_id !== 3 && (
        <form onSubmit={handleSubmit(onSubmit)} className="blog__blog-content">
          <div className="blog__actions">
            <div className="blog__actions-container">
              <i className="fa fa-trash blog__delete" onClick={handleDelete} aria-hidden="true"></i>
              <button className="blog__post-submit" type="submit">
                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </form>
      )}
      {errorMessage && <Error className={"blog__edit-error"}>{errorMessage}</Error>}
      <section className="blog__main-content">
        <textarea
          className={isEditPost ? "blog__edit-content" : "blog__content"}
          ref={contentRef}
          value={currentContent}
          onChange={({ target }) => setCurrentContent(target.value)}
          disabled={!isEditPost}
        />
      </section>
    </>
  );
};
