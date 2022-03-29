const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const toAddNew = async (user) => {
  const result = await api.post("/api/users/").send(user);
  return result;
};

module.exports = {
  toAddNew,
};
