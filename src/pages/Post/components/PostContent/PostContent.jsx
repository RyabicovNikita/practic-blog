import { useSelector } from "react-redux";
import "./PostContent.scss";
import { selectPost } from "../../../../services/store/selectors/selectors";

export const PostContent = () => {
  const post = useSelector(selectPost);

  const { content, image_url, published_at, title } = post;

  console.log(post);
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
      <div className="blog__actions">
        <i class="fa fa-trash role-container__delete" aria-hidden="true"></i>
        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
      </div>
      <section className="blog__main-content">
        <span className="blog__content">{content}</span>
      </section>
    </>
  );
};
