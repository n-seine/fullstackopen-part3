const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://user:${password}@cluster0.lglfgon.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const findPeople = () => {
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((person) => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
};

const addUniquePerson = (person) => {
  person.save().then((result) => {
    console.log(`added ${person.name} : ${person.number} to phonebook`);
    mongoose.connection.close();
  });
};

if (process.argv.length === 3) {
  findPeople();
} else if (process.argv.length >= 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });
  addUniquePerson(person);
} else {
  //Process.argvAlength === 4, so it misses either name or number
  console.log(
    "If you want to add a name to the phonebook, you should input both name and phone number as arguments"
  );
  process.exit(1);
}
