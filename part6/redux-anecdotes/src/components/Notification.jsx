import React from "react";
import { useSelector, useDispatch } from "react-redux";
/* import notificationReducer, {
  setNotification,
  removeNotification,
} from "../reducers/notificationReducer"; */

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  const dispatch = useDispatch();

  return notification === "" ? null : <div style={style}> {notification}</div>;
};

export default Notification;
