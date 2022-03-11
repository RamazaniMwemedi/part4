require("dotenv").config();

const PORT = process.env.PORT;
const MONGODB_URI_PERSON = process.env.MONGODB_URI_PERSON;
const   MONGODB_URI_NOTES = process.env.MONGODB_URI_NOTE;
module.exports = {
  MONGODB_URI_PERSON,
  MONGODB_URI_NOTES,
  PORT,
};
