const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const toDelete = async (id) => {
  const result = await api.delete(`/api/blogs/${id}`);
  return result;
};

module.exports = {
  toDelete,
};
