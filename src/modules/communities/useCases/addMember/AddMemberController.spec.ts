import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuid4 } from "uuid";

import { app } from "../../../../shared/infra/http/app";
import createConnection from "../../../../shared/infra/typeorm";

let connection: Connection;
let userToAddId: string;

describe("Add Member Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const userId = uuid4();
    userToAddId = uuid4();
    const communityId = uuid4();
    const hashedPassword = await hash("1234", 8);

    await connection.query(
      `INSERT INTO USERS(id, full_name, email, birth_date, created_at, password) VALUES ('${userId}', 'Banana 10', 'banana@example.com', '1920-12-12', 'now()', '${hashedPassword}'), ('${userToAddId}', 'Banana 20', 'banana2@example.com', '1920-12-12', 'now()', '${hashedPassword}');
      INSERT INTO COMMUNITIES(id, name, description, created_at, creator_id) VALUES ('${communityId}', 'Banana Fam', 'Description', 'now()', '${userId}');
      UPDATE USERS SET COMMUNITY_ID='${communityId}' WHERE ID='${userId}'`
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to add a member to a community", async () => {
    const signInResponse = await request(app).post("/auth/session").send({
      email: "banana@example.com",
      password: "1234",
    });

    const { token } = signInResponse.body;

    const response = await request(app)
      .post("/communities/members")
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        user_to_add_id: userToAddId,
      });

    expect(response.status).toBe(204);
  });

  it("should not be able to add a member to a community if the user is not found", async () => {
    const signInResponse = await request(app).post("/auth/session").send({
      email: "banana@example.com",
      password: "1234",
    });

    const { token } = signInResponse.body;

    const response = await request(app)
      .post("/communities/members")
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        user_to_add_id: uuid4(),
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("User not found.");
  });

  it("should not be able to add a member to a community if the user is already part of a community", async () => {
    const signInResponse = await request(app).post("/auth/session").send({
      email: "banana@example.com",
      password: "1234",
    });

    const { token } = signInResponse.body;

    const response = await request(app)
      .post("/communities/members")
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        user_to_add_id: userToAddId,
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("User is already part of a community.");
  });
});
