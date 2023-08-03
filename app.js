const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
mongoose.connect("mongodb://127.0.0.1/contactDance", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const port = 8000;

//Define mongoose schema
var contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  desc: String,
});

var Contact = mongoose.model("Contact", contactSchema);

// Express specific stuff
app.use("/static", express.static("static")); // For serving static files
app.use(express.urlencoded());

// Pug specific stuff
app.set("view engine", "pug"); // Set the template engine as pug
app.set("views", path.join(__dirname, "views")); // Set the views directory

// Endpoints
app.get("/", (req, res) => {
  const params = {};
  res.status(200).render("home.pug", params);
});

app.get("/about", (req, res) => {
  const params = {};
  res.status(200).render("about.pug", params);
});

app.get("/services", (req, res) => {
  const params = {};
  res.status(200).render("services.pug", params);
});

app.get("/classes", (req, res) => {
  const params = {};
  res.status(200).render("classes.pug", params);
});

app.get("/contact", (req, res) => {
  const params = {};
  res.status(200).render("contact.pug", params);
});

app.post("/contact", (req, res) => {
  var myData = new Contact(req.body);
  myData
    .save()
    .then(() => {
      res.send("This item has been saved to the database");
    })
    .catch(() => {
      res.send(400)("Item was not saved to the database");
    });
});

app.listen(port, () => {
  console.log(`The application started successfully on port ${port}`);
});
