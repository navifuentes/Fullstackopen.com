const Blog = require("../models/blog");

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

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
};
