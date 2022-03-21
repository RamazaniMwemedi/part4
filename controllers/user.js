const userRouter = require("express").Router();
const User = require("../models/user");

userRouter.get("/", (req, res, next) => {
  User.find({})
    .then((user) => res.json(user))
    .catch((error) => next(error));
});

module.exports = userRouter;
