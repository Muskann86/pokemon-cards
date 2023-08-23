import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../App";
import { useHistory } from "react-router-dom";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { isLogged, setAuth } = useContext(UserContext);
  const history = useHistory();
  const onSubmit = (data) => {
    console.log(data);
    setAuth();
    history.push("/")
  };
  console.log(isLogged);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="d-block justify-content-center container my-3">
      <h1 className="text-center" style={{ color: "purple" }}>
        Login
      </h1>
      <div className="mb-3 col-6 mx-auto">
        <input
          type="username"
          className="form-control"
          id="username"
          placeholder="Username"
          {...register("username", {
            required: "Username is required !",
            maxLength: 15,
          })}
        />
        <li style={{ color: "red", listStyle: "none" }}>
          {errors.username && errors.username.message}
        </li>
      </div>
      <div className="mb-3 col-6 mx-auto">
        <input
          type="password"
          className="form-control"
          id="Password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required !",
            minLength: 6,
          })}
        />
        <li style={{ color: "red", listStyle: "none" }}>
          {errors.password && errors.password.message}
        </li>
      {isLogged ? (
        <span className="d-grid gap-2 col-6 my-4 mx-auto btn btn-lg fw-bold fs-5 text-white text-uppercase" 
        style={{ backgroundColor: "purple" }}
        onClick={onSubmit}>
          Se déconnecter
        </span>
      ) : (
        <button
        className="d-grid gap-2 col-6 my-4 mx-auto btn btn-lg fw-bold fs-5 text-white text-uppercase"
        style={{ backgroundColor: "purple" }}
        >
          Se connecter
        </button>
      )}
      </div>
    </form>
  );
}

export default Login;
