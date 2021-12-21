import { Connection, createConnection, getConnectionOptions } from "typeorm";
import { AuroraDataApiConnectionOptions } from "typeorm/driver/aurora-data-api/AuroraDataApiConnectionOptions";

interface IOpts {
  host: string;
  database: string;
}

export default async (): Promise<Connection> => {
  const options = await getConnectionOptions();

  return createConnection(
    Object.assign(options, {
      database:
        process.env.NODE_ENV === "test"
          ? "money_tracker_test"
          : options.database,
    }) as AuroraDataApiConnectionOptions
  );
};
