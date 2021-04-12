const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  var likeSum = 0;
  blogs.forEach((blog) => (likeSum += blog.likes));
  return likeSum;
};

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  const blogsToSort = blogs;
  blogsToSort.sort((a, b) => {
    const likesA = a.likes;
    const likesB = b.likes;
    return likesA - likesB;
  });
  const favourite = blogsToSort.reverse()[0];
  return {
    title: favourite.title,
    author: favourite.author,
    likes: favourite.likes,
  };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }
  const authors = blogs.map((blog) => blog.author);
  const foundMostBlogs = _.chain(authors)
    .countBy()
    .toPairs()
    .maxBy(_.last)
    .value();
  return {
    author: foundMostBlogs[0],
    blogs: foundMostBlogs[1],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
};
