import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuid4 } from "uuid";

import { User } from "../../../accounts/infra/typeorm/entities/User";
import { app } from "../../../../shared/infra/http/app";
import createConnection from "../../../../shared/infra/typeorm";
import { Community } from "../../../communities/infra/typeorm/entities/Community";

let connection: Connection;
let communityId: string;
let userId: string;

describe("Create Income Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    userId = uuid4();
    communityId = uuid4();
    const hashedPassword = await hash("1234", 8);

    await connection.query(
      `INSERT INTO USERS(id, full_name, email, birth_date, created_at, password) VALUES ('${userId}', 'Banana 10', 'banana@example.com', '1920-12-12', 'now()', '${hashedPassword}');
      INSERT INTO COMMUNITIES(id, name, description, created_at, creator_id) VALUES ('${communityId}', 'Banana Fam', 'Description', 'now()', '${userId}');
      UPDATE USERS SET COMMUNITY_ID='${communityId}' WHERE ID='${userId}'`
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to create an income", async () => {
    const signInResponse = await request(app).post("/auth/session").send({
      email: "banana@example.com",
      password: "1234",
    });

    const { token } = signInResponse.body;

    const response = await request(app)
      .post("/incomes")
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        amount: 1000,
        description: "Payday",
        date: "2021-10-12 23:00",
      });

    expect(response.status).toBe(201);
  });
});
