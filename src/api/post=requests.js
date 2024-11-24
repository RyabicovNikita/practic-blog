import { generateDateTime } from "../services";

export const getPosts = () =>
  fetch("http://localhost:3005/posts")
    .then((res) => res.json())
    .then((posts) => posts);

export const getPostById = (id) =>
  fetch(`http://localhost:3005/posts/${id}`)
    .then((res) => res.json())
    .then((post) => post);

export const fetchCommentInPost = (userId, postId, content) =>
  fetch(`http://localhost:3005/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      author_id: userId,
      post_id: postId,
      content,
      published_at: generateDateTime(),
    }),
  }).then((data) => data.json());
