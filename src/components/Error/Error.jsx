export const Error = ({ className, children }) => (
  <div
    style={{ color: "red", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
    className={className}
  >
    {children}
  </div>
);
