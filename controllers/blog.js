const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const middleware = require("../utils/middleware");

blogsRouter.get("/", async (req, res) => {
  const blog = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.json(blog);
});

blogsRouter.post("/", middleware.userExtractor, async (req, res) => {
  const body = req.body;
  const user = req.user;
  if (body.title === undefined || body.url === undefined) {
    res.status(400).end();
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  });

  const newBlog = await blog.save();
  user.blogs = user.blogs.concat(newBlog._id);
  await user.save();

  res.status(201).json(newBlog);
});

blogsRouter.delete("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  let blogUserId = JSON.stringify(blog.user);
  let userId = JSON.stringify(req.user._id);
  // console.log(req.user);
  if (blogUserId === userId) {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204);
  }
  res.status(401);
});

blogsRouter.put("/:id", async (req, res) => {
  const { title, author, url, likes , user } = req.body;
  const blog = {
    title,
    author,
    url,
    likes,
    user,
  };
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
    runValidators: true,
    context: "query",
  });

  res.json(updatedBlog);
});

module.exports = blogsRouter;
