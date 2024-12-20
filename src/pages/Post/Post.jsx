import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { deletePost, getPost, POST_ACTION_TYPES } from "../../services/store/actions";
import { useEffect, useState } from "react";

import { Comments, PostContent } from "./components";
import "./Post.scss";
import { Modal, Loader, PrivateContainer } from "../../components";
import { Error404 } from "../NotFound/NotFound";

export const Post = () => {
  const [accessError, setAccessError] = useState(null);
  const [serverError, setServerError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { postId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    getPost(postId)
      .then((postData) => {
        if (Object.keys(postData.post).length > 0) dispatch({ type: POST_ACTION_TYPES.GET_POST, payload: postData });
      })
      .catch((error) => {
        switch (error) {
          case 404:
            setServerError(<Error404 />);
            break;
          default:
            setServerError("Что-то пошло не так. Повторите попытку позднее.");
        }
      })
      .finally(() => setIsLoading(false));
    return () => dispatch({ type: POST_ACTION_TYPES.CLEAR_POST_STATE });
  }, []);

  const confirmDeletePost = () => {
    deletePost(postId).then((result) => {
      if (result.error) {
        setAccessError(result.error);
        setIsModalOpen(false);
        return;
      }
      setIsModalOpen(false);
      navigate("/");
    });
  };
  const rejectDeletePost = () => setIsModalOpen(false);
  return (
    <div className="blog">
      {isLoading ? (
        <Loader />
      ) : (
        <PrivateContainer error={accessError}>
          {serverError ? (
            serverError
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
        </PrivateContainer>
      )}
    </div>
  );
};
