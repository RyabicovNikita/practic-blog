export const UserCard = ({ user }) => (
  <div className="users__row">
    <span className="users__cell">{user.login}</span>
    <span className="users__cell">{user.registed_at}</span>
    <span className="users__cell">{user.role}</span>
  </div>
);
