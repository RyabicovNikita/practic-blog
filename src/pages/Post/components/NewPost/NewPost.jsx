import * as yup from "yup";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./NewPost.scss";
import { MIN_HEIGTH_POST } from "../../../../services";
import { createNewPost } from "../../../../services/store/actions";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Error } from "../../../../components/Error/Error";
import { getPostFormParams } from "../../validates";

export const NewPost = () => {
  const navigate = useNavigate();
  const contentRef = useRef(null);
  const [serverError, setServerError] = useState(null);
  const deleteServerErrorIfNeed = () => {
    if (serverError !== null) setServerError(null);
  };
  const {
    register,
    unregister,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm(getPostFormParams({ image_url: "" }));

  const registerInputs = (isInit = true) => {
    if (isInit) {
      register("title", { value: "" });
      register("content", { value: "" });
    } else {
      unregister("title");
      unregister("content");
    }
  };

  useEffect(() => {
    registerInputs(true);
    return () => registerInputs(false);
  }, []);

  const postValue = getValues();

  useLayoutEffect(() => {
    if (postValue.content) {
      contentRef.current.style.height = "inherit";
      contentRef.current.style.height = `${Math.max(contentRef.current.scrollHeight, MIN_HEIGTH_POST)}px`;
    }
  }, [postValue.content]);

  const handleSave = () => {
    try {
      createNewPost(postValue).then(({ id }) => navigate(`/post/${id}`));
    } catch (error) {
      setServerError(error);
    }
  };

  const titleError = errors?.title?.message;
  const contentError = errors?.content?.message;

  const onValidateChange = ({ target }) => {
    deleteServerErrorIfNeed();
    setValue(target.name, target.value, { shouldDirty: false, shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(handleSave)} className="blog">
      <section className="blog__top-content">
        <img alt="" className="blog__main-image" src={postValue.image_url}></img>
        <input
          name="image_url"
          className="blog__input-url"
          placeholder="Введите URL картинки"
          value={postValue.image_url}
          onChange={onValidateChange}
        ></input>
        <input
          name="title"
          placeholder="Введите  заголовок статьи"
          className="blog__title-input edit"
          style={{ borderColor: titleError ? "red" : "white" }}
          value={postValue.title}
          onChange={onValidateChange}
        ></input>
        {titleError && <Error>{titleError}</Error>}
      </section>

      <div className="blog__actions">
        <button className="blog__action-container" type="submit">
          <i className="fa fa-floppy-o blog__save" aria-hidden="true"></i>
        </button>
        {/* {errorMessage && <Error className={"blog__create-error"}>{errorMessage}</Error>} */}
      </div>

      <section className="blog__main-content">
        <textarea
          name="content"
          placeholder="Введите содержание статьи"
          className="blog__edit-content edit"
          ref={contentRef}
          style={{ borderColor: contentError ? "red" : "white" }}
          value={postValue.content}
          onChange={onValidateChange}
        />
        {contentError && <Error>{contentError}</Error>}
      </section>
    </form>
  );
};
