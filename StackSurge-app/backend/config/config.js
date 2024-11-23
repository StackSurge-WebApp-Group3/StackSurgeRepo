const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "secret_key",
  mongoUri:
    process.env.MONGODB_URI ||
    "mongodb+srv://aysha:ta4FhSFfKN0f39qR@cluster0.2maws.mongodb.net/StackSurge?retryWrites=true&w=majority&appName=Cluster0" ||
    process.env.MONGO_HOST ||
    "mongodb://" +
      (process.env.IP || "localhost") +
      ":" +
      (process.env.MONGO_PORT || "27017") +
      "/stacksurge",
};
export default config;
