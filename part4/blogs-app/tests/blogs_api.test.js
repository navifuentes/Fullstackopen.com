const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe("GET request", () => {
  test("all blogs are returned", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });
  test("verify the propierty id exists", async () => {
    const blogsAtStart = await helper.blogsInDb();

    blogsAtStart.map((b) => expect(b.id).toBeDefined());
  });
  test("a specific blog is within the returned blogs", async () => {
    const response = await api.get("/api/blogs");

    const titles = response.body.map((r) => r.title);
    expect(titles).toContain("test blog 2");
  });
  test("a specific blog can be viewed", async () => {
    const blogsAtStart = await helper.blogsInDb();

    const blogToView = blogsAtStart[0];

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(resultBlog.body).toEqual(blogToView);
  });
});
describe("POST Request", () => {
  test("a valid blog can be added & content is stored succesfully in DB", async () => {
    const newBlog = {
      author: "fullstackopen",
      likes: 6,
      title: "async/await simplifies making async calls",
      url: "fullstackopen.com/part4",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((b) => b.title);
    expect(titles).toContain("async/await simplifies making async calls");
    const authors = blogsAtEnd.map((b) => b.author);
    expect(authors).toContain("fullstackopen");
    const urls = blogsAtEnd.map((b) => b.url);
    expect(urls).toContain("fullstackopen.com/part4");
    const likesArray = blogsAtEnd.map((b) => b.likes);
    expect(likesArray).toContain(6);
  });
  test("a blog can be created without the propierty likes", async () => {
    const newBlog = {
      author: "unlike",
      title: "this blog is missing the likes prop.",
      url: "www.cosi.it/asd",
    };
    await api.post("/api/blogs").send(newBlog);

    const blogsAtEnd = await helper.blogsInDb();
    const lastBlog = blogsAtEnd[blogsAtEnd.length - 1];

    expect(lastBlog).toEqual(expect.objectContaining({ likes: 0 }));
  });
  test("a blog can not be created without the title,author,url", async () => {
    const newBlog = {
      likes: 1,
    };
    await api.post("/api/blogs").send(newBlog).expect(400);
  });
  test("blog without content is not added", async () => {
    const newBlog = {
      likes: 4,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});
describe("PUT request", () => {
  test("a blog can be updated", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: 100 })
      .expect(200);
  });
});
describe("DELETE request", () => {
  test("a blog can be deleted", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map((b) => b.title);
    expect(titles).not.toContain(blogToDelete.title);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
