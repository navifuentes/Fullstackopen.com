const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
} else if (process.argv.length === 3) {
  const password = process.argv[2];
  const url = `mongodb+srv://ivanfa:${password}@coderbackend.sofmxkl.mongodb.net/phonebook?retryWrites=true&w=majority`;
  mongoose.set("strictQuery", false);
  mongoose.connect(url);

  Person.find({}).then((result) => {
    console.log("Phonebook :");
    result.forEach((person) => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length > 3) {
  const password = process.argv[2];
  const url = `mongodb+srv://ivanfa:${password}@coderbackend.sofmxkl.mongodb.net/phonebook?retryWrites=true&w=majority`;
  mongoose.set("strictQuery", false);
  mongoose.connect(url);

  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });
  person.save().then((result) => {
    console.log(`added ${person.name} number ${person.number} to phonebook`);
    mongoose.connection.close();
  });
}
