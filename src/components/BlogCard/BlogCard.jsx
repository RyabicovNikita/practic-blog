import "./BlogCard.css";

export const BlogCard = () => (
  <>
    <div className="blog-card spring-fever">
      <img className="img2" alt="" src={require("./images/black-pin.png")} />
      <div className="img-container">
        <img
          className="img"
          alt=""
          src="https://images.unsplash.com/photo-1551923064-9f993866844e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=350&h=500&dpi=2&fit=crop&crop=entropy"
        />
      </div>

      <div className="content">
        <div className="title-content">
          <h3>
            <a href="#">10 inspiring photos</a>
          </h3>
          <div className="intro">
            {" "}
            <a href="#">Inspiration</a>{" "}
          </div>
        </div>
        <div className="card-info">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim...
          <a href="#">
            Read Article<span className="licon icon-arr icon-black"></span>
          </a>
        </div>
        <div className="utility-info">
          <ul className="utility-list">
            <li>
              <span className="licon icon-like"></span>
              <a href="#">2</a>
              <span className="licon icon-com"></span>
              <a href="#">12</a>
            </li>

            <li>
              <span className="licon icon-dat"></span>03 jun 2017
            </li>
          </ul>
        </div>
      </div>
    </div>
  </>
);
