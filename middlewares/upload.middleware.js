import multer from "multer";

import { v4 as uuidv4 } from "uuid";
import path from "path";
import MyError from "../utils/customError.js";
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

export { upload };
