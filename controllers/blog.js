const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", (req, res, next) => {
  Blog.find({})
    .then((blog) => {
      res.json(blog);
    })
    .catch((error) => next(error));
});

blogsRouter.post("/", (req, res, next) => {
  const body = req.body;
  console.log(body);
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  blog
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => next(error));
});

blogsRouter.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((error) => next(error));
});

blogsRouter.put("/:id", (req, res, next) => {
  const blog = {
    title: req.body.title,
  };
  Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedBlog) => {
      res.json(updatedBlog);
    })
    .catch((error) => next(error));
});

module.exports = blogsRouter;
