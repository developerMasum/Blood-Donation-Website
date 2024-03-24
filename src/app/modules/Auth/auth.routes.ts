import express from "express";
import { AuthController } from "./auth.controller";
import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/login",

  AuthController.loginUser
);

router.post(
  "/refreshToken",

  AuthController.refreshToken
);
router.post(
  "/change-password",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DONAR, UserRole.SEEKER),
  AuthController.changePassword
);


router.post(
  "/forget-password",

  AuthController.forgetPassword
);

router.post(
  "/reset-password",

  AuthController.resetPassword
);

export const AuthRoutes = router;
