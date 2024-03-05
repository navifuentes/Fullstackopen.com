import Error from "../messages/ErrorMessage";
import PropTypes from "prop-types";
import useField from "../../hooks/useField";
import Button from "../buttons/Button";
import Title from "../titles/title";

const LoginForm = ({ handleSubmit }) => {
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
    <div className="flex flex-col items-center">
      <Title type={"h1"} text={"Log in to app"} />
      <Error />

      <form className="flex flex-col items-center" onSubmit={sendLogIn}>
        <div className="my-2">
          username
          <input className="ml-2 border-2 border-black" {...username} />
        </div>
        <div className="my-2">
          password
          <input className="ml-2 border-2 border-black" {...password} />
        </div>
        <Button text={"log in"} type="subimit" />
      </form>
    </div>
  );
};
LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
