import "./Comment.scss";
export const Comment = ({ id, author_login, content, published_at }) => (
  <div className="comment">
    <div className="comment__content">{content}</div>
    <div className="comment__info">
      <span className="comment__author">{author_login}</span>
      <span className="comments_published-date">{published_at}</span>
    </div>
  </div>
);
