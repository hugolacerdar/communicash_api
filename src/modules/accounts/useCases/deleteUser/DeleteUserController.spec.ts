import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuid4 } from "uuid";

import { app } from "../../../../shared/infra/http/app";
import createConnection from "../../../../shared/infra/typeorm";

let connection: Connection;

describe("Delete User Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id1 = uuid4();
    const id2 = uuid4();
    const hashedPassword = await hash("1234", 8);

    await connection.query(
      `INSERT INTO USERS(id, full_name, email, birth_date, created_at, password) VALUES ('${id1}', 'Banana 10', 'banana@example.com', '1920-12-12', 'now()', '${hashedPassword}'), ('${id2}', 'Banana 11', 'banana2@example.com', '1920-12-12', 'now()', '${hashedPassword}')`
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to delete the session's user", async () => {
    const signInResponse = await request(app).post("/auth/session").send({
      email: "banana@example.com",
      password: "1234",
    });

    const { token } = signInResponse.body;

    const response = await request(app)
      .delete("/users/profile")
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(204);
  });

  it("should not be able to delete the session's user if the user is not found", async () => {
    const signInResponse = await request(app).post("/auth/session").send({
      email: "banana2@example.com",
      password: "1234",
    });

    const { token } = signInResponse.body;

    connection.query(`DELETE FROM USERS WHERE EMAIL='banana2@example.com'`);

    const response = await request(app)
      .delete("/users/profile")
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(400);
  });
});
