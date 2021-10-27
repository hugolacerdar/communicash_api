import { Router } from "express";

import { CreateIncomeController } from "../../../../modules/incomes/useCases/createIncome/CreateIncomeController";
import { checkAuthentication } from "../middlewares/checkAuthentication";
import { checkIsCommunityMember } from "../middlewares/checkIsCommunityMember";

const incomeRoutes = Router();

const createIncomeController = new CreateIncomeController();

incomeRoutes.post(
  "/",
  checkAuthentication,
  checkIsCommunityMember,
  createIncomeController.handle
);

export { incomeRoutes };
