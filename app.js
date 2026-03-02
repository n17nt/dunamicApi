import express from "express";
import studentRouter from "./routes/student.route.js";
import teacherRoute from "./routes/teacher.route.js";
import ErrorHandler from "./middlewares/errorHandler.middleware.js";
import studentModel from "./model/student.model.js";
import multer from "multer";

import { v4 as uuidv4 } from "uuid";
import path from "path";
import MyError from "./utils/customError.js";
const app = express();

app.use(express.json());
// app.use(upload());
app.use("/static", express.static("./public"));
app.use(express.static("./views/css"));
app.use(express.static("./views"));

app.set("views", "./views");
app.set("view engine", "ejs");

app.use("/api/v1/student", studentRouter);
app.use("/api/v1/teacher", teacherRoute);

let storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    console.log(file.size);
    if (file.mimetype.startsWith("image/")) {
      cb(
        null,
        String(uuidv4()) +
          "_" +
          String(Date.now()) +
          path.extname(file.originalname),
      );
    } else {
      cb(new MyError(400, "File rams bo'lishi shart"));
    }
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});
app.post("/api/v1/upload", upload.single("file"), (req, res, next) => {
  console.log(req.file.originalname);
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
  let students = await studentModel.find();
  res.render("index", {
    islogo: false,
    logo: "N7 Practicum guruh",
    students: students,
  });
});
app.use(ErrorHandler);
export default app;
