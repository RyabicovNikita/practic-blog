export const getPosts = () =>
  fetch("http://localhost:3005/posts")
    .then((res) => res.json())
    .then((posts) => posts);

export const getPostById = (id) =>
  fetch(`http://localhost:3005/posts/${id}`)
    .then((res) => res.json())
    .then((post) => post);
