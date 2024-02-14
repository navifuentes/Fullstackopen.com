require("dotenv").config();
const express = require("express");
const app = express();
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

//DATA
/* let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
]; */
//FUNCTIONS
const generateRandomId = () => {
  return Math.floor(Math.random() * 100000);
};

//GET
app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});
app.get("/api/persons", (req, res) => {
  Person.find({}).then((person) => {
    res.json(person);
  });
});
app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id).then((person) => res.json(person));
});
app.get("/info", (req, res) => {
  Person.find({}).then((persons) =>
    res.send(`
  <p>Phonebook has info for ${persons.length} people<p>
  <p>${new Date()}</p>
  `)
  );
});

//POST
app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;

  if (name === undefined || number === undefined) {
    return res.status(400).json({
      error: "person must contain name and number",
    });
  }
  const person = new Person({
    name,
    number,
  });
  person.save().then((savedPerson) => res.json(savedPerson));
});
//DELETE
app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((p) => p.id !== id);
  res.status(204).end();
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
