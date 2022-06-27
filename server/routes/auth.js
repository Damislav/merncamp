import express from "express";

const router = express.Router();

// middleware
import { requireSignin } from "../middlewares";
// controllers
import {
  register,
  login,
  currentUser,
  forgotPassword,
  profileUpdate,
  findPeople,
} from "../controllers/auth";

router.post("/register", register);
router.post("/login", login);
router.get("/current-user", requireSignin, currentUser);
router.post("/forgot-password", forgotPassword);

router.put("/profile-update", requireSignin, profileUpdate);
router.get("/find-people", requireSignin, findPeople);
module.exports = router;
