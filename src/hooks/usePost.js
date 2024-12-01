import { useState } from "react";

export const usePostState = () => {
  const [post, setPost] = useState({
    content: "",
    image_url: "",
    title: "",
  });
  return {
    getPost: () => post,
    updatePost: (value, field) => setPost((prevState) => ({ ...prevState, [field]: value })),
  };
};
