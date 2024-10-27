import { ROLE } from "../services";

const removeComment = () => console.log("remove comment");
export const createSession = (roleID) => {
  const session = {
    logout() {
      Object.keys(session).forEach((key) => {
        delete session[key];
      });
    },
  };
  switch (roleID) {
    case ROLE.ADMIN: {
      session.removeComment = removeComment;
      break;
    }
    case ROLE.MODERATOR: {
      session.removeComment = removeComment;
      break;
    }
    case ROLE.READER: {
      break;
    }
    default:
  }

  return session;
};
