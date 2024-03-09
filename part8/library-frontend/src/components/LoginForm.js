import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";

const LoginForm = ({ setToken, setError }) => {
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => console.log(error),
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      console.log("token", token);
      setToken(token);
      localStorage.setItem("userToken", token);
    }
  }, [result.data, setToken]);

  const onSubmit = async (e) => {
    e.preventDefault();
    login({ variables: { username, password } });
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        username
        <input
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        ></input>
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        ></input>
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
