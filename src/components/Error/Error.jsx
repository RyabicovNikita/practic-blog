import "./Error.scss";
export const Error = ({ className, children }) => (
  <div
    style={{ color: "red", display: "flex", alignItems: "center", justifyContent: "center" }}
    className={"error " + className}
  >
    {children}
  </div>
);
