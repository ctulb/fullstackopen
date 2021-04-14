const mongoose = require('mongoose');
const supertest = require('supertest');

const Blog = require('./../models/blog');
const app = require('./../app');

const testBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  },
];

const api = supertest(app);

describe('empty GET', () => {
  it('GET /api/blogs should return empty list', async () => {
    const response = await api.get('/api/blogs');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(0);
  });
  afterAll(() => {
    mongoose.connection.close();
  });
});

describe('populated GET', () => {
  beforeAll(async () => {
    await Blog.deleteMany({});
    await Blog.create(testBlogs);
  });
  it('GET /api/blogs/should return list of test blogs', async () => {
    const response = await api.get('/api/blogs');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(6);
  });
  it('id property should be correctly named in returned data', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();
    expect(response.body[0]._id).not.toBeDefined();
  });
  afterAll(() => {
    mongoose.connection.close();
  });
});

describe('test POST', () => {
  beforeAll(async () => {
    await Blog.deleteMany({});
    await Blog.create(testBlogs);
  });
  it('POST /api/blog should add a blog to the database', async () => {
    const newBlog = {
      title: 'I Really Love Bananas',
      author: 'Aiai',
      url: 'https://www.supermonkeyball.com',
      likes: 999,
    };
    const oldLength = await Blog.countDocuments({});
    const response = await api.post('/api/blogs').send(newBlog);
    const newLength = await Blog.countDocuments({});
    expect(newLength).toBe(oldLength + 1);
    expect(response.statusCode).toBe(201);
    expect(response.body.id).toBeDefined();
    expect(response.body.title).toBe(newBlog.title);
    expect(response.body.author).toBe(newBlog.author);
    expect(response.body.url).toBe(newBlog.url);
    expect(response.body.likes).toBe(newBlog.likes);
  });
  it('POST with missing likes should add a blog with likes 0 to the database', async () => {
    const newBlog = {
      title: 'Marmite is Great',
      author: 'A. N. Idiot',
      url: 'https://noone.agrees',
    };
    const response = await api.post('/api/blogs').send(newBlog);
    expect(response.statusCode).toBe(201);
    expect(response.body.likes).toBeDefined();
    expect(response.body.likes).toBe(0);
  });
  it('POST with missing title returns 400 Bad Request error', async () => {
    const newBlog = {
      author: 'F. O. Rgottitle',
      url: 'https://oopsiforgotmytitle.com',
    };
    const response = await api.post('/api/blogs').send(newBlog);
    expect(response.statusCode).toBe(400);
  });
  it('POST with missing title returns 400 Bad Request error', async () => {
    const newBlog = {
      title: 'I Forgot My Name',
      url: 'https://oopsiforgotmyname.com',
    };
    const response = await api.post('/api/blogs').send(newBlog);
    expect(response.statusCode).toBe(400);
  });
  afterAll(() => {
    mongoose.connection.close();
  });
});

describe('test DELETE', () => {
  beforeAll(async () => {
    await Blog.deleteMany({});
    await Blog.create(testBlogs[0]);
  });
  it('DELETE removes post from database', async () => {
    const postToDelete = await api.get('/api/blogs');
    const idToDelete = postToDelete.body[0].id;
    const response = await api.delete(`/api/blogs/${idToDelete}`);
    const length = await Blog.countDocuments({});
    expect(response.statusCode).toBe(204);
    expect(length).toBe(0);
  });
  it('DELETE returns 404 for an unknown ID', async () => {
    const response = await api.delete(`/api/blogs/1234567890`);
    expect(response.statusCode).toBe(404);
  });
  afterAll(() => {
    mongoose.connection.close();
  });
});
