import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { server } from "../../bff/server";
import { useState } from "react";
import { Input } from "./components/Input/Input";
import { setUser } from "../../services/store/actions/actions";
import "./AuthForm.scss";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const shapeObject = {
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
    .min(6, "Неверный пародь. Минимальный размер - 6 символа")
    .max(30, "Неверный пароль. Максимальный размер - 30 символов"),
  repeat_password: yup
    .string()
    .required("Повторите пароль")
    .oneOf([yup.ref("password"), null], "Пароли должны совпадать"),
};

export const AuthForm = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const authFormSchema = yup.object().shape(shapeObject);
  const formParams = isRegister
    ? {
        defaultValues: {
          login: "",
          password: "",
          repeat_password: "",
        },
        resolver: yupResolver(authFormSchema),
      }
    : {
        defaultValues: {
          login: "",
          password: "",
        },
        resolver: null,
      };
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm(formParams);

  const [serverError, setServerError] = useState(null);

  const dispatch = useDispatch();

  const onSubmit = async ({ login, password }) => {
    let response;
    response = isRegister ? await server.register(login, password) : await server.authorize(login, password);
    const { error, res } = response;
    if (error) {
      setServerError(error);
      return;
    }
    dispatch(setUser(res));
    navigate("/");
  };
  const onSignInClick = () => {
    setIsRegister(false);
    setServerError(null);
    reset();
  };
  const onSignOutClick = () => {
    setIsRegister(true);
    setServerError(null);
    reset();
  };

  const formError = errors?.login?.message || errors?.password?.message || errors?.repeat_password?.message;
  const errorMessage = formError || serverError;
  return (
    <div className="auth">
      <div className="auth__auth-blur">
        <form onSubmit={handleSubmit(onSubmit)} className="auth__auth-form">
          <div className="auth__header-container">
            <a onClick={onSignInClick} className={`auth__header ${!isRegister ? "active" : ""}`}>
              SIGN IN
            </a>
            <a onClick={onSignOutClick} className={`auth__header ${isRegister ? "active" : ""}`}>
              SIGN UP
            </a>
          </div>
          <div className="auth__input-fields">
            <Input
              className="auth__input"
              type="text"
              placeholder="Username"
              name="login"
              {...register("login", {
                onChange: () => setServerError(null),
              })}
            />
            <Input
              className="auth__input"
              type="password"
              name="password"
              placeholder="Password"
              {...register("password", {
                onChange: () => setServerError(null),
              })}
            />
            {isRegister && (
              <Input
                className="auth__input"
                name="repeat_password"
                type="password"
                placeholder="Repeat password"
                {...register("repeat_password", {
                  onChange: () => setServerError(null),
                })}
              />
            )}
          </div>
          <div className="auth__submit-error">
            <button disabled={!!formError} className="auth__submit" type="submit">
              {isRegister ? "Register" : "Login"}
            </button>
            {errorMessage && <div className="auth__error">{errorMessage}</div>}
          </div>
        </form>
      </div>
    </div>
  );
};
