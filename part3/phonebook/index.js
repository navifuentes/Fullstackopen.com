const express = require("express");
const app = express();

app.use(express.json());

//DATA
let persons = [
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
];
//FUNCTIONS
const generateRandomId = () => {
  return Math.floor(Math.random() * 100000);
};

//GET
app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});
app.get("/api/persons", (req, res) => {
  res.json(persons);
});
app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => p.id === id);
  if (person) {
    res.json(person);
  }
  res.status(404).end();
});
app.get("/info", (req, res) => {
  res.send(`
  <p>Phonebook has info for ${persons.length} people<p>
  <p>${new Date()}</p>
  `);
});
//POST
app.post("/api/persons", (req, res) => {
  const body = req.body;

  const personExists = persons.find(
    (p) => p.name.toLowerCase() === body.name.toLowerCase()
  );

  if (personExists) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }
  if (!body.number || !body.name) {
    return res.status(400).json({
      error: "person must contain name and number",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateRandomId(),
  };
  persons = persons.concat(person);
  res.json(person);
});
//DELETE
app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((p) => p.id !== id);
  res.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
