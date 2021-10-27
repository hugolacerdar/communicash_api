import { container } from "tsyringe";

import "./providers";

import { UsersRepository } from "../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { UsersTokensRepository } from "../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { IUsersTokensRepository } from "../../modules/accounts/repositories/IUsersTokensRepository";
import { CommunitiesRepository } from "../../modules/communities/infra/typeorm/repositories/CommunitiesRepository";
import { ICommunitiesRepository } from "../../modules/communities/repositories/ICommunitiesRepository";
import { IncomesRepository } from "../../modules/incomes/infra/typeorm/repositories/IncomesRepository";
import { IIncomesRepository } from "../../modules/incomes/repositories/IIncomesRepositories";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IUsersTokensRepository>(
  "UsersTokensRepository",
  UsersTokensRepository
);

container.registerSingleton<ICommunitiesRepository>(
  "CommunitiesRepository",
  CommunitiesRepository
);

container.registerSingleton<IIncomesRepository>(
  "IncomesRepository",
  IncomesRepository
);
