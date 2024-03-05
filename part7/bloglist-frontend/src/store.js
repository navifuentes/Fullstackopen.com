import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";
import errorReducer from "./reducers/errorReducer";
import blogsReducer from "./reducers/blogsReducer";
import userReducer from "./reducers/userReducer";
import usersReducer from "./reducers/usersReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    error: errorReducer,
    blogs: blogsReducer,
    user: userReducer,
    users: usersReducer,
  },
});

export default store;
