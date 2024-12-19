import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { deletePost, getPost, POST_ACTION_TYPES } from "../../services/store/actions";
import { useEffect, useState } from "react";

import { Comments, PostContent } from "./components";
import "./Post.scss";
import { Modal, Loader, Error } from "../../components";

export const Post = () => {
  const [serverError, setServerError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { postId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    setIsLoading(true);
    getPost(postId)
      .then((postData) => {
        if (Object.keys(postData.post).length > 0)
          dispatch({ type: POST_ACTION_TYPES.GET_POST, payload: postData.post });
      })
      .catch((error) => setServerError(error))
      .finally(() => setIsLoading(false));
    return () => dispatch({ type: POST_ACTION_TYPES.CLEAR_POST_STATE });
  }, []);

  const confirmDeletePost = () => {
    deletePost(postId).then((result) => {
      if (result.error) return;
      dispatch(result);
      setIsModalOpen(false);
      navigate("/");
    });
  };
  const rejectDeletePost = () => setIsModalOpen(false);
  console.log(serverError);
  return (
    <div className="blog">
      {isLoading ? (
        <Loader />
      ) : serverError ? (
        <Error>{serverError}</Error>
      ) : (
        <>
          <PostContent setIsModalOpen={setIsModalOpen} />
          <Comments />
          {isModalOpen && (
            <Modal>
              <div className="confirm-delete-modal">
                <p className="confirm-delete-modal__question">{"Вы действительно хотите удалить текущий пост?"}</p>
                <div className="confirm-delete-modal__answer">
                  <button onClick={confirmDeletePost} className="confirm-delete-modal__accept">
                    Да
                  </button>
                  <button onClick={rejectDeletePost} className="confirm-delete-modal__reject">
                    Отмена
                  </button>
                </div>
              </div>
            </Modal>
          )}
        </>
      )}
    </div>
  );
};
