import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuid4 } from "uuid";

import { app } from "../../../../shared/infra/http/app";
import createConnection from "../../../../shared/infra/typeorm";

let connection: Connection;
let communityId: string;
let userId: string;

describe("Get Incomes and Expenses Controller", () => {
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

    const [housing] = await connection.query(
      `SELECT ID FROM EXPENSES_CATEGORIES WHERE TITLE='Housing'`
    );

    await connection.query(
      `INSERT INTO EXPENSES VALUES('${uuid4()}', '${userId}', '${
        housing.id
      }', 'now()', 'Roof repair', 1000, '${communityId}');
      INSERT INTO INCOMES VALUES('${uuid4()}', '${userId}', 'now()', 'Freelance', 1000, '${communityId}');`
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to get incomes and expenses from the session user's community", async () => {
    const signInResponse = await request(app).post("/auth/session").send({
      email: "banana@example.com",
      password: "1234",
    });

    const { token } = signInResponse.body;

    const response = await request(app)
      .get("/communities")
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
    expect(response.body.incomes).toHaveLength(1);
    expect(response.body.expenses).toHaveLength(1);
  });
});
