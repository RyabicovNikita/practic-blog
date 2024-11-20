import { useState } from "react";
import { Comment } from "./components/Comment/Comment";

export const Comments = ({ comments }) => {
  const [newComment, setNewComment] = useState("");
  return (
    <div>
      <div>
        <textarea
          value={newComment}
          onChange={({ target }) => setNewComment(target.value)}
          placeholder="Комментарии..."
        ></textarea>
        <i class="fa fa-paper-plane" aria-hidden="true"></i>
      </div>
      <div className="comments">
        {comments &&
          comments.map(({ id, author, content, publishedAt }) => (
            <Comment key={id} id={id} author={author} content={content} publishedAt={publishedAt} />
          ))}
      </div>
    </div>
  );
};
