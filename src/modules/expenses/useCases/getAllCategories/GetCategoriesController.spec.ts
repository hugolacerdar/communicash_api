import request from "supertest";

import { Connection } from "typeorm";
import { hash } from "bcrypt";
import { v4 as uuid4 } from "uuid";

import createConnection from "../../../../shared/infra/typeorm/index";
import { app } from "../../../../shared/infra/http/app";

let connection: Connection;

describe("Get Categories Controller", () => {
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

  it("should be able to get all 10 expenses categories", async () => {
    const authResponse = await request(app).post("/auth/session").send({
      email: "banana@example.com",
      password: "1234",
    });

    const { token } = authResponse.body;

    const response = await request(app)
      .get("/expenses/categories")
      .set({ Authorization: `Bearer ${token}` });

    expect(response.body).toHaveProperty("categories");
    expect(response.body.categories).toHaveLength(10);
  });
});
