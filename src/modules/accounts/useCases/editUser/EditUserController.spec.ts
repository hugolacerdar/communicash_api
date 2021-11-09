import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuid4 } from "uuid";

import { app } from "../../../../shared/infra/http/app";
import createConnection from "../../../../shared/infra/typeorm";

let connection: Connection;

describe("Edit User Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuid4();
    const hashedPassword = await hash("1234", 8);

    await connection.query(
      `INSERT INTO USERS(id, full_name, email, birth_date, created_at, password) VALUES ('${id}', 'Banana 10', 'banana@example.com', '1920-12-12', 'now()', '${hashedPassword}')`
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to edit the session's user", async () => {
    const signInResponse = await request(app).post("/auth/session").send({
      email: "banana@example.com",
      password: "1234",
    });

    const { token } = signInResponse.body;

    const response = await request(app)
      .put("/users/profile")
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({ full_name: "Banana1000" });

    const [user] = await connection.query(
      `SELECT FULL_NAME FROM USERS WHERE EMAIL='banana@example.com'`
    );

    expect(response.status).toBe(204);
    expect(user.full_name).toBe("Banana1000");
  });

  it("should not be able to edit the session's user if the user is not found", async () => {
    const signInResponse = await request(app).post("/auth/session").send({
      email: "banana@example.com",
      password: "1234",
    });

    const { token } = signInResponse.body;

    await connection.query(
      `DELETE FROM USERS WHERE EMAIL='banana@example.com'`
    );

    const response = await request(app)
      .put("/users/profile")
      .set({ Authorization: `Bearer ${token}` })
      .set({ full_name: "Banana 23" });

    expect(response.status).toBe(400);
  });
});
