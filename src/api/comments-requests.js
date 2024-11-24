export const fetchCommentsPost = (postId) =>
  fetch(`http://localhost:3005/comments?post_id=${postId}`)
    .then((res) => res.json())
    .then((comments) => comments);
