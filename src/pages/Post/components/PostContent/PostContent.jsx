import "./PostContent.scss";

export const PostContent = ({ content, image_url, published_at, title }) => {
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
        <span>{content}</span>
      </section>
    </>
  );
};
