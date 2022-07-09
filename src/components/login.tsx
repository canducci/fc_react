import React, { FormEvent } from "react";
import { useAuth } from "../lib/login";

const Login = () => {
  const { login } = useAuth();
  let err = "";

  const handleSubmitButton = (e: FormEvent) => {
    e.preventDefault();

    var { email, password } = document.forms[0];
    login(email.value, password.value)
      .then((u) => alert("logged in"))
      .catch((e) => alert(e));
  };

  return (
    <form onSubmit={handleSubmitButton}>
      <h1>Login</h1>
      <input type="text" name="email" required placeholder="Email"></input>
      <input
        type="password"
        name="password"
        required
        placeholder="Password"
      ></input>
      <button type="submit" id="login_submit">
        Log In
      </button>
      <p>{err}</p>
    </form>
  );
};

export default Login;
