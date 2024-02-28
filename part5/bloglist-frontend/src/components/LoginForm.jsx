import Error from "./messages/ErrorMessage";

const LoginForm = ({
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleSubmit,

  errorMessage,
}) => {
  return (
    <>
      <h2>Log in to application</h2>
      <Error message={errorMessage} />

      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            type="text"
            name="Username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            type="password"
            name="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
};

export default LoginForm;