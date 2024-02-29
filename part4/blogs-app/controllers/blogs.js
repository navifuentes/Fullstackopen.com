const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const { userExtractor } = require("../utils/middleware");

//GET
blogsRouter.get("/", userExtractor, async (req, res, next) => {
  const { user } = req;
  try {
    const blogs = await Blog.find({ user: user._id }).populate("user", {
      username: 1,
      name: 1,
    });
    res.json(blogs);
  } catch (error) {
    next(error);
  }
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
blogsRouter.post("/", userExtractor, async (req, res, next) => {
  const { body, user } = req;

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
blogsRouter.put("/:id", userExtractor, async (req, res, next) => {
  const { id } = req.params;
  const { body, user } = req;

  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).send({ error: "blog id not found" });
    } else if (blog.user.toString() === user.id.toString()) {
      const updatedBlog = await Blog.findByIdAndUpdate(id, newBlog, {
        new: true,
      });
      res.status(200).json(updatedBlog);
    } else if (blog.user.toString() !== user.id.toString()) {
      return res.status(401).send({ error: "wrong authentication" });
    }
  } catch (error) {
    next(error);
  }
});

//DELETE
blogsRouter.delete("/:id", userExtractor, async (req, res, next) => {
  const { id } = req.params;
  const { user } = req;

  try {
    const blog = await Blog.findById(id);

    if (blog.user.toString() === user.id.toString()) {
      user.blogs = user.blogs
        .map((b) => b.toString())
        .filter((b) => b !== blog._id.toString());
      await user.save();
      await Blog.findByIdAndDelete(id);
      res.status(204).send({ message: "blog deleted succesfully" });
    } else if (blog.user.toString() !== user.id.toString()) {
      return res.status(401).send({ error: "wrong authentication" });
    }
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
