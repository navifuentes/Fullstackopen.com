const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

//GET
blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});
blogsRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

//POST
blogsRouter.post("/", async (req, res, next) => {
  const { body } = req;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  try {
    const savedBlog = await blog.save({ validateBeforeSave: true });
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
    res.status(200).json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

//DELETE
blogsRouter.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    await Blog.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
