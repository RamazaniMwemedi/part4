const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("notes", {
    content: 1,
    date: 1,
  });
  res.json(users);
});
usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;
  const existingUser = await User.findOne({ username });

  if (password.length <= 3) {
    return response
      .status(406)
      .send({ error: "password must be greater than 3" });
  }
  if (existingUser) {
    return response.status(400).send({
      error: "username must be unique",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = usersRouter;
