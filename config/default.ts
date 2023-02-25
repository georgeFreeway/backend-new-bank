import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT,
  databaseName: process.env.DATABASE_NAME!,
  databaseUser: process.env.DATABASE_USER!,
  databasePassword: process.env.DATABASE_PASSWORD!,
  dialect: process.env.DIALECT!,
  accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY!,
  refreshTokenPrivateKey: process.env.REFRESH_TOKEN_PRIVATE_KEY!,
  accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY!,
  refreshTokenPublicKey: process.env.REFRESH_TOKEN_PUBLIC_KEY!,
};
