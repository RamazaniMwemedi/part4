const notesRouter = require("express").Router();
const Note = require("../models/note");

// HTTP GET Requests
// GET all persons from the database
notesRouter.get("/", async (req, res) => {
  const notes = await Note.find({});
  res.json(notes);
});

// GET single person from the db byid
notesRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await Note.findById(id);
  if (result) {
    res.json(result);
  } else {
    res.status(404).end();
  }
});

notesRouter.post("/", async (req, res) => {
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

    const result = await note.save();
    res.status(201).json(result);
  }
});
// HTTP PUT Request
notesRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  const note = {
    content: body.content,
    important: body.important,
  };
  const updatedNote = await Note.findByIdAndUpdate(id, note, {
    new: true,
    runValidators: true,
    context: "query",
  });
  res.json(updatedNote);
});

// HTTP DELETE Request
notesRouter.delete("/:id", async (req, res) => {
  Note.findByIdAndDelete(req.id);
  res.status(204);
});

module.exports = notesRouter;
