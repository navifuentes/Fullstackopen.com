import Error from "../messages/ErrorMessage";
import PropTypes from "prop-types";

const LoginForm = ({
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleSubmit,
}) => {
  return (
    <>
      <h2>Log in to application</h2>
      <Error />

      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            id="username"
            type="text"
            name="Username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            name="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button id="login-button" type="submit">
          log in
        </button>
      </form>
    </>
  );
};
LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
