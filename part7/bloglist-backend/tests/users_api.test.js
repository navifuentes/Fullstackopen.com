const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const User = require("../models/users");
const bcrypt = require("bcrypt");

//Sript
//npm test -- tests/users_api.test.js

describe("when there is initially one user in DB", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", name: "rootname", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mlg",
      name: "micaela",
      password: "galaxete",
    };
    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });
  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };
    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("expected `username` to be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
  test("creation fails with proper statuscode and message if no username and/or password are given", async () => {
    const noUsername = {
      name: "nouser",
      password: "abcd1",
    };
    const noPassword = {
      username: "nopassword",
      name: "nopass",
    };
    const noPassOrUsername = {
      name: "nopassorusername",
    };

    await api
      .post("/api/users")
      .send(noUsername)
      .expect(400)
      .expect(
        '{"error":"User validation failed: username: Path `username` is required."}'
      );
    await api
      .post("/api/users")
      .send(noPassword)
      .expect(400)
      .expect('{"error":"password is required"}');
    await api
      .post("/api/users")
      .send(noPassOrUsername)
      .expect(400)
      .expect('{"error":"password is required"}');
  });
  test("creation fails with proper status code and message if username and/or password are shorter than required", async () => {
    const shortUsername = {
      username: "a",
      name: "shorUsername",
      password: "abc123",
    };
    const shortPassword = {
      username: "short",
      name: "shotPassword",
      password: "1",
    };

    await api
      .post("/api/users")
      .send(shortUsername)
      .expect(400)
      .expect(
        '{"error":"User validation failed: username: Path `username` (`a`) is shorter than the minimum allowed length (3)."}'
      );
    await api
      .post("/api/users")
      .send(shortPassword)
      .expect(400)
      .expect('{"error":"password must containt at least 3 characters"}');
  });
});
