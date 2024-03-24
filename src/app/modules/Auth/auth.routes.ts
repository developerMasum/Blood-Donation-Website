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
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
  AuthController.changePassword
);


router.post(
  "/forget-password",

  AuthController.forgetPassword
);

export const AuthRoutes = router;
