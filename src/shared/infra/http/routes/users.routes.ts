import { Router } from "express";

import { GetUserProfileController } from "../../../../modules/accounts/useCases/getUserProfile/GetUserProfileController";
import { CreateUserController } from "../../../../modules/accounts/useCases/createUser/CreateUserController";
import { DeleteUserController } from "../../../../modules/accounts/useCases/deleteUser/DeleteUserController";
import { EditUserController } from "../../../../modules/accounts/useCases/editUser/EditUserController";
import { checkAuthentication } from "../middlewares/checkAuthentication";

const userRoutes = Router();

const createUserController = new CreateUserController();
const getUserProfileController = new GetUserProfileController();
const deleteUserController = new DeleteUserController();
const editUserController = new EditUserController();

userRoutes.post("/", createUserController.handle);
userRoutes.get(
  "/profile",
  checkAuthentication,
  getUserProfileController.handle
);
userRoutes.delete("/profile", checkAuthentication, deleteUserController.handle);
userRoutes.put("/profile", checkAuthentication, editUserController.handle);

export { userRoutes };
