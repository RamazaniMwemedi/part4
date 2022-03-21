const notesRouter = require("express").Router();
const Note = require("../models/note");

// HTTP GET Requests
// GET all persons from the database
notesRouter.get("/", async (req, res, next) => {
  try {
    const notes = await Note.find({});
    res.json(notes);
  } catch (error) {
    next(error);
  }
});

// GET single person from the db byid
notesRouter.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await Note.findById(id);
    if (result) {
      res.json(result);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error);
    res.status(500).end();
  }
});

notesRouter.post("/", async (req, res, next) => {
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

    try {
      const result = await note.save();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
});
// HTTP PUT Request
notesRouter.put("/:id", async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;

  const note = {
    content: body.content,
    important: body.important,
  };
  try {
    const updatedNote = await Note.findByIdAndUpdate(id, note, {
      new: true,
      runValidators: true,
      context: "query",
    });
    res.json(updatedNote);
  } catch (error) {
    next(error);
  }
});

// HTTP DELETE Request
notesRouter.delete("/:id", async (req, res, next) => {
  try {
    Note.findByIdAndDelete(req.id);
    res.status(204);
  } catch (error) {
    next(error);
  }
});

module.exports = notesRouter;
