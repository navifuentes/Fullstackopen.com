const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) =>
  blogs.map((blog) => blog.likes).reduce((acc, curr) => acc + curr, 0);

const favoriteBlog = (blogs) => {
  const maxLikesNumber = Math.max(...blogs.map((blog) => blog.likes));
  const result = blogs.find((blog) => blog.likes === maxLikesNumber);
  const { title, author, likes } = result;
  return { title, author, likes };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
