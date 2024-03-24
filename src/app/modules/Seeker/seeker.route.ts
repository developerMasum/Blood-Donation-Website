import express from "express"
import { SeekerController } from "./seeker.controller";
const router = express.Router();

router.post('/create-seeker', SeekerController.createSeeker)

export const SeekerRoutes = router;