import { Router } from "express";
import { CreateExpenseController } from "../../../../modules/expenses/useCases/createExpense/CreateExpenseController";
import { GetCategoriesController } from "../../../../modules/expenses/useCases/getAllCategories/GetCategoriesController";
import { checkAuthentication } from "../middlewares/checkAuthentication";
import { checkIsCommunityMember } from "../middlewares/checkIsCommunityMember";

const expenseRoutes = Router();

const getCategoriesController = new GetCategoriesController();
const createExpenseController = new CreateExpenseController();

expenseRoutes.post(
  "/",
  checkAuthentication,
  checkIsCommunityMember,
  createExpenseController.handle
);
expenseRoutes.get(
  "/categories",
  checkAuthentication,
  getCategoriesController.handle
);

export { expenseRoutes };
