import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const errorSlice = createSlice({
  name: "error",
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

export const { setString, removeString } = errorSlice.actions;

export const setError = (content, seconds) => {
  return (dispatch) => {
    dispatch(setString(content));
    setTimeout(() => {
      dispatch(removeString());
    }, seconds * 1000);
  };
};

export default errorSlice.reducer;
