import "reflect-metadata";

import swaggerUi from "swagger-ui-express";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";

import rateLimiter from "../http/middlewares/rateLimiter";
import createConnection from "../typeorm";
import "../../container";
import { AppError } from "../../error/AppError";

import swaggerFile from "../../../swagger.json";
import { router } from "./routes";

createConnection();
const app = express();

app.use(rateLimiter);

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(cors());
app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

export { app };
