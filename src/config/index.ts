import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  reset_password_link: process.env.RESET_PASSWORD_LINK,
  jwt: {
    jwt_secret: process.env.JWT_SECRET,
    expires_in: process.env.EXPIRES_IN,
    refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
    refresh_token_expires_in: process.env.REFRESH_TOKEN_EXPIRES_IN,
    reset_password_token: process.env.RESET_PASSWORD_TOKEN_SECRET,
    reset_password_expires_in: process.env.RESET_PASSWORD_EXPIRES_IN,
  },
  emailSender:{
    email:process.env.EMAIL,
    email_app_password:process.env.EMAIL_APP_PASSWORD,

  }
};
