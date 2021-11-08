import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuid4 } from "uuid";

import { app } from "../../../../shared/infra/http/app";
import createConnection from "../../../../shared/infra/typeorm";

let connection: Connection;

describe("Create User Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to create a new user", async () => {
    const response = await request(app).post("/users").send({
      full_name: "Supertest Banana",
      password: "123456",
      email: "supertest@example.com",
      birth_date: "2000-12-12",
    });

    expect(response.status).toBe(201);
  });

  it("should not be able to create a new user with an email already in use on the platform", async () => {
    const response = await request(app).post("/users").send({
      full_name: "Supertest Banana",
      password: "123456",
      email: "supertest@example.com",
      birth_date: "2000-12-12",
    });

    expect(response.status).toBe(400);
  });
});
