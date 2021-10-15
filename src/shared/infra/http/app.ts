import express, { Request, Response } from "express";

import createConnection from "../typeorm";

createConnection();
const app = express();

app.use(express.json());

export { app };
