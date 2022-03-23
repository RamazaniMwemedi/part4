const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (req, res) => {
  const blog = await Blog.find({});
  res.json(blog);
});

blogsRouter.post("/", async (req, res) => {
  const body = req.body;
  console.log(body);
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  const result = await blog.save();
  res.status(201).json(result);
});

blogsRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await Blog.findByIdAndDelete(id);
  res.json(result);
});

blogsRouter.put("/:id", async (req, res) => {
  const blog = {
    title: req.body.title,
  };
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
    runValidators: true,
    context: "query",
  });

  res.json(updatedBlog);
});

module.exports = blogsRouter;
