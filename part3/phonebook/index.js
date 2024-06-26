const express = require("express");
const app = require("./app");
const config = require("./utils/config");
const logger = require("./utils/logger");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

//CONFIG
morgan.token("content", (req, res) => JSON.stringify(req.body));

//MIDDLEWARES
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time :content")
);
app.use(cors());
app.use(express.static("dist"));

//GET
app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});
app.get("/api/persons", (req, res) => {
  Person.find({}).then((person) => {
    res.json(person);
  });
});
app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      }
      res.status(404).end();
    })
    .catch((err) => next(err));
});
app.get("/info", (req, res) => {
  Person.find({}).then((persons) => {
    let info = { people: persons.length, date: new Date() };
    res.json(info);
  });
});

//POST
app.post("/api/persons", (req, res, next) => {
  const { name, number } = req.body;

  const person = new Person({
    name,
    number,
  });
  person
    .save()
    .then((savedPerson) => res.json(savedPerson))
    .catch((err) => next(err));
});

//PUT
app.put("/api/persons/:id", (req, res, next) => {
  const { number } = req.body;
  const { id } = req.params;

  Person.findByIdAndUpdate(id, { number }, { runValidators: true, new: true })
    .then((result) => {
      console.log("result", result);
      if (result === null) {
        res.status(404).send({ error: "person not found" });
      }
      res.json(result);
    })
    .catch((err) => next(err));
});

//DELETE
app.delete("/api/persons/:id", (req, res, next) => {
  const { id } = req.params;
  Person.findByIdAndDelete(id)
    .then((result) => {
      console.log("result", result);
      if (result === null) {
        res.status(404).send({ error: "person not found" });
      }
      res.status(204).end();
    })
    .catch((err) => next(err));
});

//ERROR HANDLER
const errorHandler = (error, request, response, next) => {
  console.error("error message", error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};
app.use(errorHandler);

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
