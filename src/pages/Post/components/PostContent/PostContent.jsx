import { useDispatch, useSelector } from "react-redux";
import "./PostContent.scss";
import { selectPost, selectUser } from "../../../../services/store/selectors/selectors";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { fetchSavePost } from "../../../../api";
import { POST_ACTION_TYPES } from "../../../../services/store/actions";

const MIN_HEIGTH_POST = 810;

export const PostContent = ({ setIsModalOpen }) => {
  const contentRef = useRef(null);
  const dispatch = useDispatch();
  const post = useSelector(selectPost);

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
  };

  const handleEdit = () => {
    if (isEditPost === false) setIsEditPost(true);
    else {
      fetchSavePost(post.id, currentContent).then((newPost) => {
        dispatch({ type: POST_ACTION_TYPES.UPDATE_POST, payload: newPost.content });
        setIsEditPost(false);
      });
    }
  };

  return (
    <>
      <section className="blog__top-content">
        <img className="blog__main-image" src={image_url}></img>
        <div className="blog__title">
          <span>{title}</span>
          <div className="blog__date-container">
            <span className="blog__date">{published_at}</span>
          </div>
        </div>
      </section>
      {role_id !== 3 && (
        <div className="blog__actions">
          <div className="blog__actions-container">
            <i className="fa fa-trash blog__delete" onClick={handleDelete} aria-hidden="true"></i>
            <i className="fa fa-pencil-square-o blog__edit" onClick={handleEdit} aria-hidden="true"></i>
          </div>
        </div>
      )}
      <section className="blog__main-content">
        {isEditPost ? (
          <textarea
            className="blog__edit-content"
            ref={contentRef}
            value={currentContent}
            onChange={({ target }) => setCurrentContent(target.value)}
          />
        ) : (
          <textarea ref={contentRef} disabled={true} className="blog__content" value={currentContent} />
        )}
      </section>
    </>
  );
};
