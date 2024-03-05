import Error from "../messages/ErrorMessage";
import PropTypes from "prop-types";
import useField from "../../hooks/useField";

const LoginForm = ({
  // username,
  // password,
  // handleUsernameChange,
  // handlePasswordChange,
  handleSubmit,
}) => {
  const username = useField("text");
  const password = useField("password");

  const sendLogIn = (e) => {
    e.preventDefault();
    const userObject = {
      username: username.value,
      password: password.value,
    };
    handleSubmit(userObject);
  };

  return (
    <>
      <h2>Log in to application</h2>
      <Error />

      <form onSubmit={sendLogIn}>
        <div>
          username
          <input {...username} />
        </div>
        <div>
          password
          <input {...password} />
        </div>
        <button id="login-button" type="submit">
          log in
        </button>
      </form>
    </>
  );
};
LoginForm.propTypes = {
  /* username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired, */
  handleSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
