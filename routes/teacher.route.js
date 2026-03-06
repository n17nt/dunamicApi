import { Router } from "express";
import {
  createTeacher,
  createTeacherWithPhoto,
  getAllTeacher,
} from "../controllers/teacher.controller.js";
let teacherRoute = new Router();
import authCheck from "../middlewares/auth.middlewarescheck.js";
import roleChecker from "../middlewares/role.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";

teacherRoute.get(
  "/",
  authCheck,
  roleChecker(["admin", "manager"]),
  getAllTeacher,
); //admin, manager
teacherRoute.post("/", authCheck, roleChecker(["admin"]), createTeacher); //admin
teacherRoute.post("/image", upload.single("photo"), createTeacherWithPhoto); //admin

export default teacherRoute;
