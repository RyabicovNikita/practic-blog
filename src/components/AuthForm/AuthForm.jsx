import * as yup from "yup";
import "./AuthForm.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { server } from "../../bff/server";
import { useState } from "react";
const authFormSchema = yup.object().shape({
  login: yup
    .string()
    .required("Поле логин является обязательным для заполнения")
    .matches(/\w+$/, "Неверый формат логина. Допускаются только буквы и цифры")
    .min(3, "Неверный логин. Минимальный размер - 3 символа")
    .max(15, "Неверный логин. Максимальный размер - 15 символов"),
  password: yup
    .string()
    .required("Введите пароль")
    .matches(/^[\w#$]+$/, "Неверно заполнен пароль. Допускаются только буквы, цифры и знакие #%")
    .min(6, "Неверный пародь. Минимальный размер - 3 символа")
    .max(30, "Неверный пароль. Максимальный размер - 15 символов"),
});
export const AuthForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
    },
    resolver: yupResolver(authFormSchema),
  });

  const [serverError, setServerError] = useState(null);
  const onSubmit = ({ login, password }) => {
    server.authorize(login, password).then(({ error, res }) => {
      if (error) {
        setServerError(error);
      }
    });
  };
  const formError = errors?.login?.message || errors?.password?.message;

  const errorMessage = formError || serverError;
  return (
    <div class="auth">
      <div class="auth__auth-blur">
        <form onSubmit={handleSubmit(onSubmit)} className="auth__auth-form">
          <div className="auth__header-container">
            <h1 className="auth__header active">SIGN IN</h1>
            <h1 className="auth__header">SIGN UP</h1>
          </div>
          <div className="auth__input-fields">
            <input
              className="auth__input"
              type="text"
              placeholder="Username"
              {...register("login", {
                onChange: () => setServerError(null),
              })}
            />
            <input
              className="auth__input"
              type="password"
              placeholder="Password"
              {...register("password", {
                onChange: () => setServerError(null),
              })}
            />
          </div>
          <div>
            <button disabled={!!formError} className="auth__submit" type="submit">
              Login
            </button>
            {errorMessage && <div className="auth__error">{errorMessage}</div>}
          </div>
        </form>
      </div>
    </div>
  );
};
