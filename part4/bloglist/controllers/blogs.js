const blogRouter = require('express').Router();

const Blog = require('../models/blog');

blogRouter.get('', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.post('', async (request, response) => {
  if (!request.body.title || !request.body.author) {
    return response.sendStatus(400);
  }
  const blog = new Blog(request.body);

  if (!blog.likes) {
    blog.likes = 0;
  }

  const result = await blog.save();
  response.status(201).json(result);
});

blogRouter.delete('/:id', async (request, response, next) => {
  try {
    const document = await Blog.findByIdAndDelete(request.params.id);
    if (!document) {
      response.sendStatus(404);
    } else {
      response.sendStatus(204);
    }
  } catch (error) {
    if (error.name === 'CastError') {
      return response.sendStatus(404);
    } else next(error);
  }
});

blogRouter.patch('/:id', async (request, response, next) => {
  try {
    const document = await Blog.findByIdAndUpdate(
      request.params.id,
      request.body,
      {
        new: true,
      }
    );
    if (!document) {
      response.sendStatus(404);
    } else {
      response.status(200).json(document);
    }
  } catch (error) {
    if (error.name === 'CastError') {
      return response.sendStatus(404);
    } else next(error);
  }
});

module.exports = blogRouter;
