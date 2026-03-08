import { Router } from "express";
import {
  createStudents,
  getAllStudents,
  getAllStudentsAggregate,
} from "../controllers/student.controller.js";
import jwtMiddleware from "../middlewares/auth.middleware.js";
import { validatorMiddleware } from "../middlewares/validator.middleware.js";
import { studentQuerySchema } from "../schemas/student.schema.js";

let studentRouter = new Router();
studentRouter.get("/", jwtMiddleware, getAllStudents); //worker admin
studentRouter.post("/", createStudents);
studentRouter.get(
  "/avg",
  validatorMiddleware(studentQuerySchema, "query"),
  getAllStudentsAggregate,
);
export default studentRouter;
