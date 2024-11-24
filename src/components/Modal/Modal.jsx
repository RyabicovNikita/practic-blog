import "./Modal.scss";

export const Modal = ({ children }) => (
  <div className="modal">
    <div className="modal__bg"></div>
    <div className="modal__content">{children}</div>
  </div>
);
