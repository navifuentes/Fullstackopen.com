import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogs";

const initialState = [];

const blogsReducer = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs(state, action) {
      return [...action.payload];
    },
    addNewBlog(state, action) {
      return state.concat(action.payload);
    },
    deleteBlog(state, action) {
      return [...state].filter((b) => b.id !== action.payload.id);
    },
    cleanBlogs(state, action) {
      return [];
    },
    voteBlog(state, action) {
      return [...state].map((b) =>
        b.id !== action.payload.id ? b : action.payload
      );
    },
  },
});

export const { setBlogs, addNewBlog, deleteBlog, cleanBlogs, voteBlog } =
  blogsReducer.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll();
    dispatch(setBlogs(blogs));
  };
};
export const createNewBlog = (b) => {
  return async (dispatch) => {
    await blogsService.create(b);
    const blogs = await blogsService.getAll();
    dispatch(setBlogs(blogs));
  };
};
export const deleteOneBlog = (b) => {
  return async (dispatch) => {
    await blogsService.remove(b.id);
    dispatch(deleteBlog(b));
  };
};
export const updateBlogLikes = (b) => {
  return async (dispatch) => {
    const updatedBlog = {
      ...b,
      likes: b.likes + 1,
    };
    console.log("updatedBlog", updatedBlog);
    await blogsService.update(b.id, updatedBlog);
    dispatch(voteBlog(updatedBlog));
  };
};

export default blogsReducer.reducer;
