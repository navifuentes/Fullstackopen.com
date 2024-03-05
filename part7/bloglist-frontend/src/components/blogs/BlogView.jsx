import React from "react";
import { useParams } from "react-router-dom";
import Title from "../titles/title";

import { updateBlogLikes, deleteOneBlog } from "../../reducers/blogsReducer";
import { setNotification } from "../../reducers/notificationReducer";
import { useDispatch } from "react-redux";

const BlogView = ({ user, blogs }) => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const blog = blogs.find((b) => b.id === id);

  const handleDeleteBlog = (blog) => {
    dispatch(deleteOneBlog(blog));
    dispatch(setNotification(`you deleted blog : ${blog.title}`, 5));
  };
  const handleUpdateBlog = (blog) => {
    dispatch(updateBlogLikes(blog));
    dispatch(setNotification(`you voted : ${blog.title}`, 5));
  };

  if (!blog) {
    return null;
  }

  return (
    <div className="flex flex-col items-center">
      <Title type={"h2"} text={`${blog.title}, ${blog.author}`} />
      <a href={blog.url}>{blog.url}</a>
      <div className="flex flex-col items-center">
        <div className="py-1">{blog.likes}</div>
        <button
          className="w-10 my-1 rounded-full bg-blue-600 text-white"
          onClick={() => handleUpdateBlog(blog)}
        >
          Like
        </button>
        {user.username === blog.user.username ? (
          <button
            className="w-20 my-1 rounded-full bg-blue-600 text-white"
            id="remove-button"
            onClick={() => deleteBlogToDB(blog)}
          >
            remove
          </button>
        ) : null}
      </div>
      <div>added by {blog.user.name}</div>
    </div>
  );
};

export default BlogView;
