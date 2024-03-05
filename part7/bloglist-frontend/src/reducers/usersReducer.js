import { createSlice } from "@reduxjs/toolkit";
import usersService from "../services/users";

const initialState = [];

const usersReducer = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state, action) {
      return [...action.payload];
    },
  },
});

export const { setUsers } = usersReducer.actions;

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getUsers();
    dispatch(setUsers(users));
  };
};

export default usersReducer.reducer;
