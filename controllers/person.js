const personRouter = require("express").Router();
const Person = require("../models/person");

// HTTP GET Method
// GET all persons apis

personRouter.get("/", (req, res) => {
  try {
    Person.find({}).then((person) => {
      res.json(person).status(200);
    });
  } catch (error) {
    console.error(error);
  }
});
// GET a single API
personRouter.get("/:id", (req, res) => {
  Person.findById(req.params.id).then((person) => {
    res.json(person).status(200);
  });
});

// HTTP POST Method
personRouter.post("/", (req, res, next) => {
  const { name, important } = req.body;
  const number = Number(req.body.number);
  const person = new Person({
    name,
    number,
    important,
    date: new Date(),
  });
  person
    .save()
    .then((person) => {
      res.json(person);
    })
    .catch((error) => {
      next(error);
      console.log(req.body.number);
    });
});
// HTTTP PUT method
personRouter.put("/:id", (req, res, next) => {
  const id = req.params.id;
  const person = {
    name: req.body.name,
    number: req.body.number,
  };
  Person.findByIdAndUpdate(id, person, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

// HTTP DELETE method
personRouter.delete("/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch((error) => next(error));
});

module.exports = personRouter;
