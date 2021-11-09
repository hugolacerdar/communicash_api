import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuid4 } from "uuid";

import { app } from "../../../../shared/infra/http/app";
import createConnection from "../../../../shared/infra/typeorm";

let connection: Connection;

describe("Authenticate User Controller", () => {
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

  it("should be able to authenticate an user", async () => {
    const response = await request(app).post("/auth/session").send({
      email: "banana@example.com",
      password: "1234",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("token");
  });

  it("should not be able to authenticate when using incorrect credentials", async () => {
    const response1 = await request(app).post("/auth/session").send({
      email: "plantain@example.com",
      password: "1234",
    });
    const response2 = await request(app).post("/auth/session").send({
      email: "banana@example.com",
      password: "4321",
    });

    expect(response1.status).toBe(400);
    expect(response1.body.message).toBe("Incorrect email or password");
    expect(response2.status).toBe(400);
    expect(response2.body.message).toBe("Incorrect email or password");
  });
});
