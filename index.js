const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;
morgan.token("data", (req) => JSON.stringify(req.body));

// Use middlewares
app.use(cors());
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data ")
);
app.listen(port, () => console.log(`Example app listening on port ${port}`));

let data = [
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

app.get("/api/persons", (req, res) => {
  res.json(data);
  res.status(200);
});

app.get("/info", (req, res) => {
  res.send(`Phonebook has info for ${data.length} people <br/> ${new Date()}`);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = data.find((person) => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!data.find((person) => person.id === id)) {
    console.log("Person with id", id, "does not exist");
    return res.status(404).end();
  }
  data = data.filter((person) => person.id !== id);
  console.log("Person with id", id, "has been deleted");
  console.log(data);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(400).json({
      error:
        "content missing. PLease check that both name and number are provided",
    });
  }
  if (data.find((person) => person.name === body.name)) {
    return res.status(400).json({
      error: "name already exist in the phonebook. Name must be unique",
    });
  }

  const newperson = {
    id: Math.floor(Math.random() * 1000),
    name: body.name,
    number: body.number,
  };

  data.push(newperson);
  console.log(data);
  res.status(201).json(body);
});
