import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";

const initialState = null;

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const { setUser } = userReducer.actions;

export const loginUser = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials);
      dispatch(setUser(user));
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
    } catch (error) {
      return error;
    }
  };
};

export const setLocalUser = (user) => {
  return async (dispatch) => {
    dispatch(setUser(user));
  };
};

export default userReducer.reducer;
