import { Router } from "express";
import {
  createStudents,
  getAllStudents,
} from "../controllers/student.controller.js";

let studentRouter = new Router();
studentRouter.get("/", getAllStudents);
studentRouter.post("/", createStudents);
export default studentRouter;
