const usersRouter = require("express").Router();
const User = require("../models/users");
const bcrypt = require("bcrypt");

//GET
usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  });
  res.json(users);
});
usersRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).populate("blogs", {
      title: 1,
      author: 1,
      url: 1,
      likes: 1,
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).send({ error: "user id not found" });
    }
  } catch (error) {
    next(error);
  }
});

//POST
usersRouter.post("/", async (req, res, next) => {
  const { username, name, password } = req.body;

  if (!password) {
    res.status(400).send({ error: "password is required" });
  } else if (password.length < 3) {
    res
      .status(400)
      .send({ error: "password must containt at least 3 characters" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });
  try {
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

//PUT
usersRouter.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  const user = {
    username: body.username,
    name: body.name,
    blogs: body.blogs,
  };
  try {
    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
    if (!updatedUser) {
      return res.status(404).send({ error: "user id not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

//DELETE
usersRouter.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      res.status(404).send({ error: "user id not found" });
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});
usersRouter.delete("/", async (req, res, next) => {
  try {
    await User.deleteMany({});
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
});
module.exports = usersRouter;
