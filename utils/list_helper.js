const dummy = (blogs) => {
  return blogs.length / blogs.length;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  const result = blogs.reduce((a, b) => (a.likes > b.likes ? a : b), {});

  return result;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
