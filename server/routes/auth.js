import express from "express";

// middlewares
import { requireSignin } from "../middlewares";

// controllers
import { register, login, logout, currentUser } from "../controllers/auth";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/current-user", requireSignin, currentUser);

module.exports = router;
