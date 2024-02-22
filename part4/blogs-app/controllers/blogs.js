const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

//GET
blogsRouter.get("/", (req, res) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs);
  });
});
blogsRouter.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Blog.findById(id)
    .then((blog) => {
      if (blog) {
        res.json(blog);
      } else {
        res.status(404).send({ error: "id not found" });
      }
    })
    .catch((error) => next(error));
});

//POST
blogsRouter.post("/", (req, res, next) => {
  const { body } = req;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  blog
    .save()
    .then((savedBlog) => {
      res.json(savedBlog);
    })
    .catch((error) => next(error));
});

//PUT
blogsRouter.put("/:id", (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  const note = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  Blog.findByIdAndUpdate(id, note, { new: true })
    .then((updatedBlog) => {
      res.json(updatedBlog);
    })
    .catch((error) => next(error));
});

//DELETE
blogsRouter.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      if (result === null) {
        res.status(404).send({ error: "id not found" });
      } else {
        res.status(204).end();
      }
    })
    .catch((error) => next(error));
});

module.exports = blogsRouter;
