const mongoose = require("mongoose");
const config = require("../utils/config");
const url = config.MONGODB_URI_USER;
const logger = require("../utils/logger");
mongoose
  .connect(url)
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.error(error);
  });

const userSchema = mongoose.Schema({
  name: String,
  age: Number,
  // friends: userSchema,
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("User", userSchema);