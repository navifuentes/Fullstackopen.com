import React from "react";
import Button from "../buttons/Button";

const Info = ({ user, handleLogout }) => {
  return (
    <p>
      {user.name} logged in{" "}
      <Button
        type={"black"}
        id="logout-button"
        handleClick={handleLogout}
        text={"log out"}
      />
    </p>
  );
};

export default Info;
