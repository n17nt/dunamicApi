import { Router } from "express";
import {
  createTeacher,
  getAllTeacher,
} from "../controllers/teacher.controller.js";
let teacherRoute = new Router();
import authCheck from "../middlewares/auth.middlewarescheck.js";
import roleChecker from "../middlewares/role.middleware.js";

teacherRoute.get(
  "/",
  authCheck,
  roleChecker(["admin", "manager"]),
  getAllTeacher,
); //admin, manager
teacherRoute.post("/", authCheck, roleChecker(["admin"]), createTeacher); //admin

export default teacherRoute;
