/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const url = process.env.MONGODB_URI;

console.log("connecting to", url);
mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: [true, "Name required"],
  },
  number: {
    type: String,
    validate: {
      validator: (v) => {
        return /\d{2,3}-\d{8}/.test(v);
      },
    },
    required: [true, "Phone number required"],
  },
});

contactSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Contact", contactSchema);
