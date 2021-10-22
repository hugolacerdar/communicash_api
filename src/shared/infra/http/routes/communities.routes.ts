import { Router } from "express";

import { CreateCommunityController } from "../../../../modules/communities/useCases/createCommunity/CreateCommunityController";
import { checkAuthentication } from "../middlewares/checkAuthentication";

const communityRoutes = Router();

const createCommunityController = new CreateCommunityController();

communityRoutes.post(
  "/",
  checkAuthentication,
  createCommunityController.handle
);

export { communityRoutes };
