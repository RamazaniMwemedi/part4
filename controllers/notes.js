const notesRouter = require("express").Router();
const Note = require("../models/note");

// HTTP GET Requests
// GET all persons from the database
notesRouter.get("/", (req, res) => {
  try {
    Note.find({}).then((note) => {
      const noteToSend = note.filter((n) => n.content !== undefined);
      console.log("Datas are sent");
      res.json(noteToSend);
    });
    console.log("API asked");
  } catch (error) {
    console.error(error);
  }
});

// GET single person from the db byid
notesRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  Note.findById(id)
    .then((result) => {
      if (result) {
        res.json(result);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).end();
    });
});

notesRouter.post("/", (req, res, next) => {
  const body = req.body;
  if (body.content === undefined) {
    return res.status(400).json({
      Error: "Body is undefined",
    });
  } else {
    const note = new Note({
      content: body.content,
      important: body.important,
      date: new Date(),
    });

    note
      .save()
      .then((result) => {
        res.json(result);
      })
      .catch((error) => next(error));
  }
});
// HTTP PUT Request
notesRouter.put("/:id", (req, res, next) => {
  const id = req.params.id;
  const body = req.body;

  const note = {
    content: body.content,
    important: body.important,
  };
  Note.findByIdAndUpdate(id, note, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedNote) => {
      res.json(updatedNote);
    })
    .catch((error) => next(error));
});

// HTTP DELETE Request
notesRouter.delete("/:id", (req, res, next) => {
  Note.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});

module.exports = notesRouter;