import express from "express";
import { signin, signout } from "../controllers/authController.js";

console.log("Imported signin:", signin);
console.log("Imported signout:", signout);

const router = express.Router();
router.route("/auth/signin").post(signin);
router.route("/auth/signout").post(signout);

export const authRoutes = router;
