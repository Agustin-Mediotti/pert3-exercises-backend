require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use(express.static("dist"));
const Contact = require("./models/contact");

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

app.use(morgan("tiny"));

app.get("/api/persons", (req, res) => {
  Contact.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get("/info", (req, res) => {
  res.send(
    `<p>Phonebook has info for ${persons.length} people <br/> ${new Date()}</p>`
  );
});

app.get("/api/persons/:id", (req, res, next) => {
  Contact.findById(req.params.id)
    .then((result) => {
      console.log(result);
      res.json(result);
    })
    .catch((err) => next(err));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Contact.findByIdAndRemove(req.params.id)
    .then((result) => {
      console.log(result);
      res.status(204).end();
    })
    .catch((err) => next(err));

  res.status(204).end();
});

app.post("/api/persons", (req, res, next) => {
  const body = req.body;

  const person = new Contact({
    name: body.name,
    number: Number(body.number),
  });
  console.log(JSON.stringify(person));
  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch((err) => next(err));
});

app.put("/api/persons/:id", (req, res, next) => {
  const { name, number } = req.body;

  Contact.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedContact) => {
      console.log(updatedContact);
      res.json(updatedContact);
    })
    .catch((err) => next(err));
});

const errorHandling = (err, req, res, next) => {
  console.log(err);

  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformetted id" });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }
  next(err);
};

app.use(errorHandling);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
