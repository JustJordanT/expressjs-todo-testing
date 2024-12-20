const request = require("supertest");
const app = require("../../app");
const newTodo = require("../mock-data/new-todo.json");
const { json } = require("express");
const Todo = require("../../model/todo.model");

const endPointUrl = "/todos/";
let firstTodo;

describe(endPointUrl, () => {
  it("POST " + endPointUrl, async () => {
    const reponse = await request(app).post(endPointUrl).send(newTodo);
    firstTodo = reponse.body;
    expect(reponse.statusCode).toBe(201);
    expect(reponse.body.title).toBe(newTodo.title);
    expect(reponse.body.done).toBe(newTodo.done);
  });

  it("Should return 500 on data with POST " + endPointUrl, async () => {
    const response = await request(app)
      .post(endPointUrl)
      .send({ title: "Missing done property" });
    expect(response.statusCode).toBe(500);
    expect(response.body).toStrictEqual({
      message: "Todo validation failed: done: Path `done` is required.",
    });
  });

  it("GET " + endPointUrl, async () => {
    const response = await request(app).get(endPointUrl);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].title).toBeDefined();
    expect(response.body[0].done).toBeDefined();
  });

  it(
    "Should return 500 on data with GET when server errors." + endPointUrl,
    async () => {
      // Mock Todo.find to throw an error
      jest.spyOn(Todo, "find").mockImplementation(() => {
        throw new Error("Server error");
      });

      const response = await request(app).get(endPointUrl);
      expect(response.statusCode).toBe(500);
      expect(response.body).toStrictEqual({
        message: "Server error",
      });

      // Restore the original implementation
      Todo.find.mockRestore();
    }
  );
  it("GET " + endPointUrl + ":todoId", async () => {
    const response = await request(app).get(endPointUrl + firstTodo._id);
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(firstTodo.title);
    expect(response.body.done).toBe(firstTodo.done);
  });

  it("Should return 404 on GET " + endPointUrl + ":todoId", async () => {
    const response = await request(app).get(
      endPointUrl + "5f6f7b7b7b7b7b7b7b7b7b7b"
    );
    expect(response.statusCode).toBe(404);
  });

  it("PUT " + endPointUrl + ":todoId", async () => {
    const updatedTodo = { title: "Make integration test for PUT", done: true };
    const response = await request(app)
      .put(endPointUrl + firstTodo._id)
      .send(updatedTodo);
    expect(response.statusCode).toBe(204);
    expect(response.body.title).toBe(response.body.title);
    expect(response.body.done).toBe(response.body.done);
  });

  it("Should return 404 on PUT " + endPointUrl + ":todoId", async () => {
    const response = await request(app)
      .put(endPointUrl + "5f6f7b7b7b7b7b7b7b7b7b7b")
      .send(newTodo);
    expect(response.statusCode).toBe(404);
  });

  it("DELETE " + endPointUrl + ":todoId", async () => {
    const response = await request(app).delete(endPointUrl + firstTodo._id);
    expect(response.statusCode).toBe(204);
  });

  it("Should return 404 on DELETE " + endPointUrl + ":todoId", async () => {
    const response = await request(app).delete(
      endPointUrl + "5f6f7b7b7b7b7b7b7b7b7b7b"
    );
    expect(response.statusCode).toBe(404);
  });
});
