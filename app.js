const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const Note = require("./models/note");

require("dotenv").config();

app.use(express.json());
app.use(cors());

const dbURI =
  "mongodb+srv://notes-admin:notes-admin-password@note-cluster.dyoax.mongodb.net/notes-db?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((result) =>
    app.listen("5050", "127.0.0.1", () => {
      console.log("listening on http://127.0.0.1:5050 and connected to DB");
    })
  )
  .catch((err) => console.log(err));

app.post("/notes", (req, res) => {
  // console.log(req.body);
  const note = new Note(req.body);
  note
    .save()
    .then((response) => {
      res.status(200).send({ message: "we got your post request", response });
    })
    .catch((err) => {
      console.log("we got error in post method");
      console.log(err);
      res.send(err);
    });
});

app.get("/notes", (req, res) => {
  Note.find()
    .then((response) => {
      // console.log("we got get request");
      res.status(200).send({ message: "we got your get request", response });
    })
    .catch((err) => {
      console.log("we got error in post method");
      console.log(err);
      res.send(err);
    });
});

app.delete("/notes/:noteID", (req, res) => {
  // console.log("we got delete request");
  // console.log(req.params.noteID);
  Note.findByIdAndDelete(req.params.noteID)
    .then((response) => {
      // console.log(response);
      res.status(200).send({ message: "item was deleted" });
    })
    .catch((err) => {
      console.log("we got an error in delete note by ID");
      console.log(err);
      res.send(err);
    });
  // res.status(200).send({ message: "we got your delete request" });
  // Note.find()
  //   .then((response) => {
  //     console.log("we got get request");
  //     res.status(200).send({ message: "we got your get request", response });
  //   })
  //   .catch((err) => {
  //     console.log("we got error in post method");
  //     console.log(err);
  //     res.send(err);
  //   });
});
app.put("/notes/:noteID", (req, res) => {
  // console.log("we got delete request");
  // console.log(req.params.noteID);
  Note.findByIdAndUpdate({ _id: req.params.noteID }, req.body)
    .then((response) => {
      // console.log(response);
      res.status(200).send({ message: "item was updated" });
    })
    .catch((err) => {
      console.log("we got an error in PUT/update note by ID");
      console.log(err);
      res.send(err);
    });
  // res.status(200).send({ message: "we got your delete request" });
  // Note.find()
  //   .then((response) => {
  //     console.log("we got get request");
  //     res.status(200).send({ message: "we got your get request", response });
  //   })
  //   .catch((err) => {
  //     console.log("we got error in post method");
  //     console.log(err);
  //     res.send(err);
  //   });
});
console.log(process.env.PORT);
