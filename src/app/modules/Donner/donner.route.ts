import express from "express";
import { DonnerController } from "./donner.controller";

const router = express.Router();


router.post("/create-donner",
//  auth(UserRole.SUPER_ADMIN,UserRole.ADMIN), 
 DonnerController.createDonner);

export const DonnerRoutes = router;
