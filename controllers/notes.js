const notesRouter = require("express").Router();
const User = require("../models/user");
const Note = require("../models/note");

// HTTP GET Requests
// GET all persons from the database
notesRouter.get("/", async (req, res) => {
  const notes = await Note.find({}).populate("User", { username: 1, name: 1 });
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
notesRouter.post("/", async (request, response) => {
  const body = request.body;

  const user = await User.findById(body.userId);

  const note = new Note({
    content: body.content,
    important: body.important === undefined ? false : body.important,
    date: new Date(),
    user: user._id,
  });

  const savedNote = await note.save();
  user.notes = user.notes.concat(savedNote._id);
  await user.save();

  response.json(savedNote);
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
