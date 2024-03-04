import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setString(state, action) {
      const notification = action.payload;
      return notification;
    },
    removeString(state, action) {
      return "";
    },
  },
});

export const { setString, removeString } = notificationSlice.actions;

export const setNotification = (content, seconds) => {
  return (dispatch) => {
    dispatch(setString(content));
    setTimeout(() => {
      dispatch(removeString());
    }, seconds * 1000);
  };
};

export default notificationSlice.reducer;
