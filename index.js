const express = require("express");
const app = express();

const PORT = 3001;

let notes = [
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

const getDateTime = () => {
  let time = new Date();
  let dateTime = `${new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "2-digit",
  })
    .format(new Date(Date.UTC(time.getDay(), time.getMonth())))
    .split(" ")
    .map((w) => w.substring(0, 3))
    .join(
      " "
    )} ${time.getFullYear()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()} GMT+${
    time.getTimezoneOffset() / 60
  } (${Intl.DateTimeFormat().resolvedOptions().timeZone.split("/").join(" ")})`;

  return dateTime;
};

app.get("/api/persons", (req, res) => {
  res.json(notes);
});

app.get("/info", (req, res) => {
  res.send(
    `<p>Phonebook has info for ${
      notes.length
    } people <br/> ${getDateTime()}</p>`
  );
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
