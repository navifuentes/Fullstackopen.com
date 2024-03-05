import React from "react";
import { useParams } from "react-router-dom";
import Title from "../titles/title";

import {
  updateBlogLikes,
  updateBlogComments,
  deleteOneBlog,
} from "../../reducers/blogsReducer";
import { setNotification } from "../../reducers/notificationReducer";
import { setError } from "../../reducers/errorReducer";
import { useDispatch } from "react-redux";

import { useField } from "../../hooks/useField";

const BlogView = ({ user, blogs }) => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const blog = blogs.find((b) => b.id === id);
  const [comment, resetComment] = useField("text");

  const handleDeleteBlog = (blog) => {
    if (window.confirm(`want to delete ${blog.title} ?`)) {
      dispatch(deleteOneBlog(blog));
      dispatch(setError(`you deleted blog : ${blog.title}`, 5));
    }
  };
  const handleUpdateBlog = (blog) => {
    dispatch(updateBlogLikes(blog));
    dispatch(setNotification(`you voted : ${blog.title}`, 5));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const commentToAdd = {
      comment: comment.value,
    };
    resetComment();
    dispatch(updateBlogComments(blog, commentToAdd));
    dispatch(setNotification(`you commented the blog !`, 5));
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
            onClick={() => handleDeleteBlog(blog)}
          >
            remove
          </button>
        ) : null}
      </div>
      <div>added by {blog.user.name}</div>
      <ul className="flex flex-col items-center">
        <p className="underline my-1 text-xl font-semibold">comments:</p>
        {blog.comments.map((c) => (
          <li key={blog.comments.indexOf(c)} className="list-disc my-1">
            {c.content}
          </li>
        ))}
      </ul>
      <form
        onSubmit={handleSubmit}
        className="pb-5 flex flex-col items-center"
        action="submit"
      >
        <div className="my-2 text-xl underline font-semibold">
          Leave a comment !
        </div>
        <textarea
          placeholder="... ✍"
          cols="30"
          rows="3"
          {...comment}
        ></textarea>
        <button
          className="w-20 my-2 rounded-full bg-blue-600 text-white"
          type="submit"
        >
          submit
        </button>
      </form>
    </div>
  );
};

export default BlogView;
