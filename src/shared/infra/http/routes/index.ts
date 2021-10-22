import { Router } from "express";
import { userRoutes } from "./users.routes";
import { authenticationRoutes } from "./authentication.routes";
import { communityRoutes } from "./communities.routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/auth", authenticationRoutes);
router.use("/communities", communityRoutes);

export { router };
