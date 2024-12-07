import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const shapePost = {
  title: yup
    .string()
    .required("Заголовок является обязательным для заполнения")
    .min(10, "Минимальная длина заголовока - 10 символов")
    .max(23, "Максимальная длина заголовока - 23 символа"),
  content: yup
    .string()
    .required("Заполните содержание статьи")
    .min(100, "Минимальная длина статьи - 100 символов")
    .max(2000, "Максимальная длина статьи - 2000 символов"),
};

export const getPostFormParams = (shape = {}) => {
  const formSchema = yup.object().shape({ ...shapePost, ...shape });
  return {
    defaultValues: {
      title: "",
      content: "",
      ...Object.keys(shape),
    },
    resolver: yupResolver(formSchema),
  };
};
