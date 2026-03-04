import { Router } from "express";
import {
  createStudents,
  getAllStudents,
} from "../controllers/student.controller.js";

let studentRouter = new Router();
studentRouter.get("/", getAllStudents); //worker admin
studentRouter.post("/", createStudents);
export default studentRouter;
