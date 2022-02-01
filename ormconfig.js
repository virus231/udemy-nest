var dbConfig = {
  synchronize: false
};

switch (process.env.NODE_ENV) {
  case "development":
    Object.assign(dbConfig, {
      type: "sqlite",
      database: "db.sqlite",
      synchronize: true,
      entities: ["**/*.entity.js"]
    });
    break;
  case "test":
    Object.assign(dbConfig, {
      type: "sqlite",
      database: "test.sqlite",
      synchronize: true,
      entities: ["**/*.entity.ts"]
    });
    break;
  case "production":
    break;
  default:
    throw new Error("Unknown environment");
}