const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
app.use(express.json());
app.use(cors());

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001;

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

const generateNewId = () => {
  return Math.floor(Math.random() * 9999999);
};

app.use(morgan("tiny"));

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  res.send(
    `<p>Phonebook has info for ${persons.length} people <br/> ${new Date()}</p>`
  );
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => p.id === id);

  person ? res.json(person) : res.status(404).end();
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((p) => p.id !== id);

  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "missing name or number",
    });
  } else if (persons.find((p) => p.name === body.name)) {
    return res.status(409).json({ error: "name must be unique" });
  }

  let id = generateNewId();
  while (persons.find((p) => p.id === id)) {
    id = generateNewId();
  }

  const person = {
    id: id,
    ...body,
  };
  console.log(JSON.stringify(person));

  persons = persons.concat(person);
  res.json(person);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
