import { Router } from "express";
import { userRoutes } from "./users.routes";
import { authenticationRoutes } from "./authentication.routes";
import { communityRoutes } from "./communities.routes";
import { incomeRoutes } from "./incomes.routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/auth", authenticationRoutes);
router.use("/communities", communityRoutes);
router.use("/incomes", incomeRoutes);

export { router };
