import express from "express";
import cookieParser from "cookie-parser";

import studentRouter from "./routes/student.route.js";
import teacherRoute from "./routes/teacher.route.js";
import authRouter from "./routes/auth.route.js";
import ErrorHandler from "./middlewares/errorHandler.middleware.js";
import studentModel from "./model/student.model.js";

import { upload } from "./middlewares/upload.middleware.js";
const app = express();

app.use(express.json());
app.use(cookieParser());
// app.use(upload());
app.use("/static", express.static("./public"));
app.use(express.static("./views/css"));
app.use(express.static("./views"));

app.set("views", "./views");
app.set("view engine", "ejs");

app.use("/api/v1/student", studentRouter);
app.use("/api/v1/teacher", teacherRoute);
app.use("/api/v1/auth", authRouter);

app.post("/api/v1/upload", upload.single("file"), (req, res, next) => {
  console.log(req.file.originalname);

  console.log(req.body.name);

  res.json({
    status: "Succes",
    message: "Uploaded",
  });
});
app.post("/api/v1/multi/upload", upload.array("file", 2), (req, res, next) => {
  console.log(req.files);
  res.json({
    status: "Succes",
    message: "Uploaded",
  });
});

app.get("/", async (req, res, next) => {
  res.render("index");
});
app.get("/:page", async (req, res, next) => {
  //   console.log(req.params.page);

  res.render(`${req.params.page}`);
});
// app.get("/contact", async (req, res, next) => {
//   res.render("contact");
// });
// app.get("/feature", async (req, res, next) => {
//   res.render("feature");
// });
// app.get("/blog", async (req, res, next) => {
//   res.render("blog");
// });
// app.get("/service", async (req, res, next) => {
//   res.render("service");
// });
app.use(ErrorHandler);
export default app;
