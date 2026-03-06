import { Router } from "express";
import {
  login,
  register,
  getMe,
  refreshToken,
} from "../controllers/auth.controller.js";
import jwtMiddleware from "../middlewares/auth.middleware.js";
import roleChecker from "../middlewares/role.middleware.js";

let router = new Router();
router.post("/signup", register);
router.post("/login", login);
router.get("/me", jwtMiddleware, roleChecker("admin"), getMe);
router.get("/refresh", refreshToken);
export default router;
