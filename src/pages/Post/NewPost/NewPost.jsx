import * as yup from "yup";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./NewPost.scss";
import { MIN_HEIGTH_POST } from "../../../services";
import { usePostState } from "../../../hooks";
import { useDispatch } from "react-redux";
import { createNewPost } from "../../../services/store/actions";
import { useNavigate } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Error } from "../../../components/Error/Error";

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

export const NewPost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const contentRef = useRef(null);
  const [serverError, setServerError] = useState(null);
  const { getPost, updatePost } = usePostState();
  const post = getPost();
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

  useLayoutEffect(() => {
    if (post.content) {
      contentRef.current.style.height = "inherit";
      contentRef.current.style.height = `${Math.min(contentRef.current.scrollHeight, MIN_HEIGTH_POST)}px`;
    }
  }, [post.content]);

  const handleSave = () => {
    try {
      dispatch(createNewPost(post)).then(({ payload }) => navigate(`/post/${payload.id}`));
    } catch (error) {
      setServerError(error);
    }
  };

  useEffect(() => {
    console.log(post);
  }, [post]);

  const formError = errors?.title?.message || errors?.content?.message;

  const errorMessage = formError || serverError;

  return (
    <form onSubmit={handleSubmit(handleSave)} className="blog">
      <section className="blog__top-content">
        <img alt="" className="blog__main-image" src={post.image_url}></img>
        <input
          name="url"
          className="blog__input-url"
          placeholder="Введите URL картинки"
          onChange={({ target }) => updatePost(target.value, "image_url")}
        ></input>
        <input
          name="title"
          placeholder="Введите  заголовок статьи"
          className="blog__title-input"
          {...register("title", {
            value: post.title,
            onChange: ({ target }) => updatePost(target.value, "title"),
          })}
        ></input>
      </section>

      <div className="blog__actions">
        <button className="blog__action-container" type="submit">
          <i className="fa fa-floppy-o blog__save" aria-hidden="true"></i>
        </button>
        {errorMessage && <Error className={"blog__create-error"}>{errorMessage}</Error>}
      </div>

      <section className="blog__main-content">
        <textarea
          name="content"
          placeholder="Введите содержание статьи"
          className="blog__edit-content"
          {...register("content", {
            value: post.content,
            onChange: ({ target }) => updatePost(target.value, "content"),
          })}
          ref={contentRef}
        />
      </section>
    </form>
  );
};
