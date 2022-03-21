const personRouter = require("express").Router();
const Person = require("../models/person");

// HTTP GET Method
// GET all persons apis

personRouter.get("/", async (req, res, next) => {
  try {
    const person = await Person.find({});
    res.json(person);
  } catch (error) {
    next(error);
  }
});
// GET a single API
personRouter.get("/:id", async (req, res, next) => {
  try {
    const person = await Person.findById(req.params.id);
    res.json(person);
  } catch (error) {
    next(error);
  }
});

// HTTP POST Method
personRouter.post("/", async (req, res, next) => {
  const { name, important } = req.body;
  const number = Number(req.body.number);
  const person = new Person({
    name,
    number,
    important,
    date: new Date(),
  });

  try {
    const newPerson = await person.save();
    res.json(newPerson);
  } catch (error) {
    next(error);
  }
});
// HTTTP PUT method
personRouter.put("/:id", async (req, res, next) => {
  const id = req.params.id;
  const person = {
    name: req.body.name,
    number: req.body.number,
  };
  try {
    const updatedPerson = await Person.findByIdAndUpdate(id, person, {
      new: true,
      runValidators: true,
      context: "query",
    });
    res.json(updatedPerson);
  } catch (error) {
    next(error);
  }
});

// HTTP DELETE method
personRouter.delete("/:id", async (req, res, next) => {
  try {
    await Person.findByIdAndDelete(req.params.id);
    res.sendStatus(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = personRouter;
