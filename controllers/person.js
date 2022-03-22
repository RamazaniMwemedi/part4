const personRouter = require("express").Router();
const Person = require("../models/person");

// HTTP GET Method
// GET all persons apis

personRouter.get("/", async (req, res) => {
  const person = await Person.find({});
  res.json(person);
});
// GET a single API
personRouter.get("/:id", async (req, res) => {
  const person = await Person.findById(req.params.id);
  res.json(person);
});

// HTTP POST Method
personRouter.post("/", async (req, res) => {
  const { name, important } = req.body;
  const number = Number(req.body.number);
  const person = new Person({
    name,
    number,
    important,
    date: new Date(),
  });

  const newPerson = await person.save();
  res.json(newPerson);
});
// HTTTP PUT method
personRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const person = {
    name: req.body.name,
    number: req.body.number,
  };
  const updatedPerson = await Person.findByIdAndUpdate(id, person, {
    new: true,
    runValidators: true,
    context: "query",
  });
  res.json(updatedPerson);
});

// HTTP DELETE method
personRouter.delete("/:id", async (req, res) => {
  await Person.findByIdAndDelete(req.params.id);
  res.sendStatus(204).end();
});

module.exports = personRouter;
