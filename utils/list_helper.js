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

const mostBlogs = (blogs) => {
  const author = blogs
    .map((blog) => blog.author)
    .reduce(
      (initialValue, author) => (initialValue > author ? initialValue : author),
      ""
    );

  const bloger = blogs.filter((blog) => blog.author === author);
  const nOfBlogs = bloger.length;
  const result = {
    author: author,
    blogs: nOfBlogs,
  };
  return result;
};

const mostLikes = (blogs) => {
  const likes = blogs
    .map((blog) => blog.likes)
    .reduce(
      (initialValue, likes) => (initialValue > likes ? initialValue : likes),
      ""
    );

  const bloger = blogs
    .map((blog) => blog)
    .filter((blog) => blog.likes === likes)
    .map((n) => n.author);

  const totalLikes = blogs
    .filter((blog) => blog.author === bloger[0])
    .map((blog) => blog.likes)
    .reduce((initialValue, likes)=>(initialValue + likes),0)
  // const a = bloge

  const result = {
    author: bloger,
    likes:totalLikes,
  };
  return result;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
