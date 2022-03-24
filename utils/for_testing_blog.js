const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const toDelete = async (id) => {
  const result = await api.delete(`/api/blogs/${id}`);
  return result;
};

const toUpdate = async (id) => {
  const blog = { likes: 76 };
  const result = await api.put(`/api/blogs/${id}`).send(blog);

  return result;
};

module.exports = {
  toDelete,
  toUpdate,
};
