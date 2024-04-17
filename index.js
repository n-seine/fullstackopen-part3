const app = require("./lib/expressConfig");
const Person = require("./models/Person");

app.get("/api/persons", (req, res) => {
  Person.find({}).then((result) => {
    res.json(result);
  });
});

app.get("/info", async (req, res) => {
  const data = await Person.find({});
  console.log("data", data);
  res.send(`Phonebook has info for ${data.length} people <br/> ${new Date()}`);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  console.log("id", id);
  Person.findById(id).then((person) => {
    if (person) {
      res.json(person);
    } else {
      res.status(404).end();
    }
  });
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  console.log("id", id);
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

  const newPerson = new Person({
    name: body.name,
    number: body.number,
  });

  newPerson.save().then((data) => {
    res.status(201).json(data);
  });
});
