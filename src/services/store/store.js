import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from "redux";
import { thunk } from "redux-thunk";
import { postReducer, postsReducer, userReducer, usersReducer } from "./reducers";

const reducer = combineReducers({
  user: userReducer,
  users: usersReducer,
  post: postReducer,
  posts: postsReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
