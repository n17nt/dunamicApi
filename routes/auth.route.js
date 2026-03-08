import { Router } from "express";
import {
  login,
  register,
  getMe,
  refreshToken,
} from "../controllers/auth.controller.js";
import jwtMiddleware from "../middlewares/auth.middleware.js";
import roleChecker from "../middlewares/role.middleware.js";
import { validatorMiddleware } from "../middlewares/validator.middleware.js";
import { loginAuthSchema, registerAuthSchema } from "../schemas/auth.schema.js";
import { getAllStudents } from "../controllers/student.controller.js";

let router = new Router();
router.post("/signup", validatorMiddleware(registerAuthSchema), register);
router.post("/login", validatorMiddleware(loginAuthSchema), login);
router.get("/me", jwtMiddleware, roleChecker("admin"), getMe);
router.get("/students", getAllStudents);
router.get("/refresh", refreshToken);
export default router;
