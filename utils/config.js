require("dotenv").config();

const PORT = process.env.PORT;
const MONGODB_URI_PERSON = process.env.MONGODB_URI_PERSON;
const MONGODB_URI_NOTES = process.env.MONGODB_URI_NOTE;
const MONGODB_URI_BLOG = process.env.MONGODB_URI_BLOG;
module.exports = {
  MONGODB_URI_PERSON,
  MONGODB_URI_NOTES,
  MONGODB_URI_BLOG,
  PORT,
};
