import { Router } from "express";
import {
  createTeacher,
  getAllTeacher,
} from "../controllers/teacher.controller.js";
let teacherRoute = new Router();

teacherRoute.get("/", getAllTeacher);
teacherRoute.post("/", createTeacher);

export default teacherRoute;
