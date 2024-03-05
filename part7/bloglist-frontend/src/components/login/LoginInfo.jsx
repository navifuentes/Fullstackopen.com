import React from "react";
import Notification from "../messages/NotificationMessage";
import Error from "../messages/ErrorMessage";
import Button from "../buttons/Button";

const infoContainer = ({ user, handleLogout }) => {
  return (
    <>
      <Notification />
      <Error />

      <p>
        {user.name} logged in{" "}
        <Button
          id="logout-button"
          handleClick={handleLogout}
          text={"log out"}
        />
      </p>
    </>
  );
};

export default infoContainer;
