import dotenv from "dotenv";
dotenv.config();

const config = {
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY || "30d",
  MONGODB_URL: process.env.MONGODB_URL,
  PORT: process.env.PORT,
  SMTP_MAIL_HOST: process.emv.SMTP_MAIL_HOST,
  SMTP_MAIL_PORT: process.emv.SMTP_MAIL_HOST,
  SMTP_MAIL_USERNAME: process.emv.SMTP_MAIL_USERNAME,
  SMTP_MAIL_PASSWORD: process.emv.SMTP_MAIL_PASSWORD,
  SMTP_MAIL_EMAIL: process.emv.SMTP_MAIL_EMAIL,
};

export default config;
