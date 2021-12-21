import * as redis from "redis";
import "dotenv/config";
import { RateLimiterRedis } from "rate-limiter-flexible";
import { NextFunction, Request, Response } from "express";

import { AppError } from "../../../error/AppError";

const redisClient = redis.createClient({
  legacyMode: true,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    sessionTimeout: 20,
  },
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "middleware",
  points: 10,
  duration: 5,
});

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    redisClient.connect();
    await limiter.consume(request.ip);

    return next();
  } catch (error) {
    next(new AppError("Too many requests", 429));
  } finally {
    await redisClient.disconnect();
  }
}
