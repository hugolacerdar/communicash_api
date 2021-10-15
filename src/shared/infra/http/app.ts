import "reflect-metadata";

import express, { Request, Response } from "express";

import createConnection from "../typeorm";
import { router } from "./routes";
import "../../container";

createConnection();
const app = express();

app.use(express.json());
app.use(router);

export { app };
