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

const mostBlogs = (blogs) => {
  const authorsBlogs = blogs.reduce((authors, blog) => {
    const authorExist = authors.findIndex((x) => x.author === blog.author);
    authorExist !== -1
      ? authors[authorExist].blogs++
      : authors.push({ author: blog.author, blogs: 1 });

    return authors;
  }, []);
  return authorsBlogs.reduce((a, b) => (a.blogs > b.blogs ? a : b));
};

const mostLikes = (blogs) => {
  const authorLikes = blogs.reduce((authors, blog) => {
    const authorExist = authors.findIndex((x) => x.author === blog.author);
    authorExist !== -1
      ? (authors[authorExist].likes += blog.likes)
      : authors.push({ author: blog.author, likes: blog.likes });

    return authors;
  }, []);
  return authorLikes.reduce((a, b) => (a.likes > b.likes ? a : b));
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
