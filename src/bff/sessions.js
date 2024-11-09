import { uuidv4 } from "../services";

export const sessions = {
  list: {},
  create(user) {
    const hash = uuidv4();

    this.list[hash] = user;

    return hash;
  },

  remove(hash) {
    delete this.list[hash];
  },
};
