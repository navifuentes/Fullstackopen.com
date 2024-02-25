const Blog = require("../models/blog");
const User = require("../models/users");

const initialBlogs = [
  {
    title: "testing blog 1",
    author: "Giuseppe",
    url: "www.test.it/test1",
    likes: 5,
  },
  {
    title: "test blog 2",
    author: "Luigi",
    url: "www.test.com/test2",
    likes: 20,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ title: "willremovethissoon" });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};
const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};
const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
};
