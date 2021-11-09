import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuid4 } from "uuid";

import { app } from "../../../../shared/infra/http/app";
import createConnection from "../../../../shared/infra/typeorm";

let connection: Connection;

describe("Refresh Token Controller", () => {
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

  it("should be able to renew an access token", async () => {
    const authResponse = await request(app).post("/auth/session").send({
      email: "banana@example.com",
      password: "1234",
    });

    const { refresh_token } = authResponse.body;

    const response = await request(app)
      .post("/auth/refresh-token")
      .send({ token: refresh_token });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("token");
  });

  it("should not be able to renew an access token when the refresh token is not found", async () => {
    const authResponse = await request(app).post("/auth/session").send({
      email: "banana@example.com",
      password: "1234",
    });

    const { refresh_token } = authResponse.body;

    await connection.query(
      `DELETE FROM USERS_TOKENS WHERE REFRESH_TOKEN = '${refresh_token}'`
    );

    const response = await request(app)
      .post("/auth/refresh-token")
      .send({ token: refresh_token });

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual("Refresh Token does not exist!");
  });

  it("should get the refresh token from the alternative sources", async () => {
    const authResponse = await request(app).post("/auth/session").send({
      email: "banana@example.com",
      password: "1234",
    });

    const { refresh_token: rt1 } = authResponse.body;

    const response1 = await request(app)
      .post("/auth/refresh-token")
      .set("x-access-token", rt1);

    expect(response1.status).toBe(201);

    const { refresh_token: rt2 } = response1.body;

    const response2 = await request(app)
      .post("/auth/refresh-token")
      .query({ token: rt2 });

    expect(response2.status).toBe(201);
  });
});
