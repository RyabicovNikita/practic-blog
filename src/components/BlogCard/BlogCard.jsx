import { Link } from "react-router-dom";
import "./BlogCard.scss";
import { useEffect, useState } from "react";
import { dateTimeToDate } from "../../services";
import { getCommentsCount } from "../../services/store/actions";

export const BlogCard = ({ post }) => {
  const [countComments, setCountComments] = useState(null);
  const { id, title, content, image_url, published_at, likes } = post;

  useEffect(() => {
    getCommentsCount(id).then((count) => setCountComments(count));
  }, [id]);

  return (
    <>
      <div className="blog-card spring-fever">
        <img className="img2" alt="" src={require("./images/black-pin.png")} />
        <div className="img-container">
          <img className="img" alt="" src={image_url} />
        </div>
        <div className="content" style={{ backgroundColor: image_url ? "rgba(0, 0, 0, 0)" : "#474545c2" }}>
          <div className="title-content">
            <h3>
              <span href="#">{title}</span>
            </h3>
          </div>
          <div className="card-info">
            <span className="card-info__content">{content}</span>
            <Link className="card-info__post-link" to={`/post/${id}`}>
              Read Article
              <span className="licon icon-arr icon-black" />
            </Link>
          </div>
          <div className="utility-info">
            <ul className="utility-list">
              <li>
                <span className="licon icon-like" />
                <span>{likes}</span>
                <span className="licon icon-com" />
                <span>{countComments}</span>
              </li>
              <li>
                <span className="licon icon-dat" />
                {dateTimeToDate(published_at)}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
