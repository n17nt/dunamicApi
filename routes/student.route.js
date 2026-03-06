import { Router } from "express";
import {
  createStudents,
  getAllStudents,
  getAllStudentsAggregate,
} from "../controllers/student.controller.js";
import jwtMiddleware from "../middlewares/auth.middleware.js";

let studentRouter = new Router();
studentRouter.get("/", jwtMiddleware, getAllStudents); //worker admin
studentRouter.post("/", createStudents);
studentRouter.get("/avg", getAllStudentsAggregate);
export default studentRouter;
