require("dotenv").config();

const PORT = process.env.PORT;
const MONGODB_URI_PERSON = process.env. NODE_ENV === "test"? process.env.MONGODB_URI_PERSON_TEST: process.env.MONGODB_URI_PERSON;
const MONGODB_URI_NOTES = process.env.MONGODB_URI_NOTE;
const MONGODB_URI_BLOG = process.env.MONGODB_URI_BLOG;
const MONGODB_URI_USER = process.env.MONGODB_URI_USER;
module.exports = {
  MONGODB_URI_PERSON,
  MONGODB_URI_NOTES,
  MONGODB_URI_BLOG,
  PORT,
  MONGODB_URI_USER,
};
