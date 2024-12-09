import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { deletePost, getPost, POST_ACTION_TYPES } from "../../services/store/actions";
import { useEffect, useState } from "react";

import { Comments, PostContent } from "./components";
import "./Post.scss";
import { Modal, Loader } from "../../components";

export const Post = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { postId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    setIsLoading(true);
    getPost(postId)
      .then((post) => dispatch({ type: POST_ACTION_TYPES.GET_POST, payload: post }))
      .finally(() => setIsLoading(false));
    return () => dispatch({ type: POST_ACTION_TYPES.DELETE_POST });
  }, []);

  const confirmDeletePost = () => {
    deletePost(postId).then((result) => {
      dispatch(result);
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
