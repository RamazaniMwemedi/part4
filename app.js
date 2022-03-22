const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const notesRouter = require("./controllers/notes");
const personRouter = require("./controllers/person");
const blogsRouter = require("./controllers/blog");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

logger.info("connecting to", config.MONGODB_URI_PERSON);

mongoose
  .connect(config.MONGODB_URI_PERSON)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
// app.use(middleware.requestLogger);

app.use("/api/notes", notesRouter);
app.use("/api/persons", personRouter);
app.use("/api/blogs", blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
