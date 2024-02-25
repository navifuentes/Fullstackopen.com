const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/users");

//GET
blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.json(blogs);
});
blogsRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id).populate("user", {
      username: 1,
      name: 1,
    });
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).send({ eror: "blog id not found" });
    }
  } catch (error) {
    next(error);
  }
});

//POST
blogsRouter.post("/", async (req, res, next) => {
  const { body, token } = req;

  const decodedToken = jwt.verify(token, process.env.SECRET);
  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  });

  try {
    const savedBlog = await blog.save({ validateBeforeSave: true });
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

//PUT
blogsRouter.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  const note = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, note, { new: true });
    if (!updatedBlog) {
      return res.status(404).send({ error: "blog id not found" });
    }
    res.status(200).json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

//DELETE
blogsRouter.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res.status(404).send({ error: "blog id not found" });
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});
blogsRouter.delete("/", async (req, res, next) => {
  try {
    await Blog.deleteMany({});
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
});
module.exports = blogsRouter;
