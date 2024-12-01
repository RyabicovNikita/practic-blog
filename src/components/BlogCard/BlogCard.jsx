import { Link } from "react-router-dom";
import "./BlogCard.scss";
import { getCommentsPost } from "../../services/store/actions";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { dateTimeToDate } from "../../services";

export const BlogCard = ({ post }) => {
  const [countComments, setCountComments] = useState(null);
  const { id, title, content, image_url, published_at, likes } = post;

  useEffect(() => {
    getCommentsPost(id).then((comments) => setCountComments(comments?.length));
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
              <a href="#">{title}</a>
            </h3>
            {/* <div className="intro">
              {" "}
              <a href="#">Inspiration</a>{" "}
            </div> */}
          </div>
          <div className="card-info">
            <span className="card-info__content">{content}</span>
            <Link to={`/post/${id}`}>
              Read Article<span className="licon icon-arr icon-black"></span>
            </Link>
          </div>
          <div className="utility-info">
            <ul className="utility-list">
              <li>
                <span className="licon icon-like"></span>
                <a href="#">{likes}</a>
                <span className="licon icon-com"></span>
                <a href="#">{countComments}</a>
              </li>

              <li>
                <span className="licon icon-dat"></span>
                {dateTimeToDate(published_at)}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
