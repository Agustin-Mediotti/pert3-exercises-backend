const mongoose = require("mongoose");

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://agustinmediotti:${password}@cluster0.opwvdyv.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Contact = mongoose.model("Contact", contactSchema);

const newContact = new Contact({
  name: name,
  number: number,
});

if (process.argv.length === 3) {
  Contact.find({}).then((res) => {
    console.log("phonebook:");
    res.forEach((note) => {
      console.log(`${note.name} ${note.number}`);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  newContact.save().then((res) => {
    console.log(`added ${res.name} number ${res.number} to phonebook`);
    mongoose.connection.close();
  });
}
