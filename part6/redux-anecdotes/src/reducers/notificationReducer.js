import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setString(state, action) {
      const notification = action.payload;
      return notification;
    },
    removeNotification(state, action) {
      return "";
    },
  },
});

export const { setString, removeNotification } =
  notificationSlice.actions;

export const setNotification = (content, seconds) => {
  return async (dispatch) => {
    dispatch(setString(content));
    setTimeout(() => {
      dispatch(removeNotification());
    }, seconds * 1000);
  };
};

export default notificationSlice.reducer;
