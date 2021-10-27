import { Router } from "express";

import { AddMemberController } from "../../../../modules/communities/useCases/addMember/AddMemberController";
import { CreateCommunityController } from "../../../../modules/communities/useCases/createCommunity/CreateCommunityController";
import { checkAuthentication } from "../middlewares/checkAuthentication";
import { checkIsCommunityMember } from "../middlewares/checkIsCommunityMember";

const communityRoutes = Router();

const createCommunityController = new CreateCommunityController();
const addMemberController = new AddMemberController();

communityRoutes.post(
  "/",
  checkAuthentication,
  createCommunityController.handle
);

communityRoutes.post(
  "/members",
  checkAuthentication,
  checkIsCommunityMember,
  addMemberController.handle
);

export { communityRoutes };
