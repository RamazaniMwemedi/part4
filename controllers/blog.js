const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (req, res) => {
  console.log(req.body);
  const blog = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.json(blog);
});

// const getTokenFrom = (request) => {
//   const authorization = request.get("authorization");
//   if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
//     return authorization.substring(7);
//   }
//   return null;
// };

blogsRouter.post("/", async (req, res) => {
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

blogsRouter.delete("/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id).then(() => {
    res.sendStatus(204).end();
  });
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
