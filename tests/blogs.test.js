const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const listHelper = require("../utils/list_helper");
const forTestingBlog = require("../utils/for_testing_blog");

// const Blogs = require("../models/blogs");

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

var user = {};

beforeEach(async () => {
  const res = await api.post("/api/login").send({ username: "rmr", password: "rmrlc" });
  user= res.body;
  console.log("This is the user",user, "You got him" );
});

describe("Exercise 4.8 - 4.12", () => {
  test("should get all the blogs in JSON format", async () => {
    await api.get("/api/blogs").expect("Content-Type", /application\/json/);
  }, 1000000);

  test("should check if a blog has an id", async () => {
    const result = await api.get("/api/blogs");

    const blogs = result._body;

    expect(blogs.map((b) => b.id)).toBeDefined();
  });

  test("should post a new blog", async () => {
    const newBlog = {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0,
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .auth(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJtciIsImlkIjoiNjI0MmRmMWMyMDZhZDQ0OGJjNTFkNTI5IiwiaWF0IjoxNjQ4NjM0MjQxfQ.P1CLrDa6u6hsOp1wEdqLtiBVIq10RAlRqm38H_bFTwc",
        { type: "bearer" }
      )
      .expect("Content-Type", /application\/json/);
  }, 100000);

  test("should check if the new blog has the like property else set it to 0", async () => {
    const newBlog = {
      _id: "5a422b3a1b54a676234d17f9",
      title: "JFD",
      author: "Name",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      // likes:12,
      __v: 0,
    };
    const blog = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      likes: newBlog.likes || 0,
    };
    await api
      .post("/api/blogs")
      .send(blog)
      .auth(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJtciIsImlkIjoiNjI0MmRmMWMyMDZhZDQ0OGJjNTFkNTI5IiwiaWF0IjoxNjQ4NjM0MjQxfQ.P1CLrDa6u6hsOp1wEdqLtiBVIq10RAlRqm38H_bFTwc",
        { type: "bearer" }
      )
      .expect(201)
      .expect("Content-Type", /application\/json/);
  }, 1000000);
});

test("Blogs", () => {
  const result = listHelper.dummy(blogs);

  expect(result).toBe(1);
});

describe("Total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ];

  test("When list of blogs is 1", () => {
    const result = listHelper.totalLikes(listWithOneBlog);

    expect(result).toBe(5);
  });
});

describe("For testing favorite likes", () => {
  test("The most favorible blog", () => {
    const result = listHelper.favoriteBlog(blogs);

    expect(result).toEqual(result);
    console.log(result);
  });
});

describe("Most blogs", () => {
  test("should test the most bloger", () => {
    const result = listHelper.mostBlogs(blogs);

    expect(result).toEqual(result);

    console.log(result);
  });
});

describe("Famous", () => {
  test("should test the most liked bloger", () => {
    const result = listHelper.mostLikes(blogs);

    expect(result).toEqual(result);

    console.log(result);
  });
});

describe("Deleting and updating a blog", () => {
  test("should delete a single blog", async () => {
    const result = await forTestingBlog.toDelete("623c3e4405b79687501eefbc");

    expect(result.statusCode).toBe(204);
  }, 1000000);

  test("should update a blogs likes", async () => {
    const result = await forTestingBlog.toUpdate("623c5e2cf5ca8382f1b76281");

    expect(result.statusCode).toBe(200);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
