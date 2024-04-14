const express = require("express");
const app = express();
const port = 3001;

app.use(express.json());
app.listen(port, () => console.log(`Example app listening on port ${port}`));

const data = [
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
