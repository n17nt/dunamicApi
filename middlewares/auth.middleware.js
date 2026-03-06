import jwt from "jsonwebtoken";
import MyError from "../utils/customError.js";
let jwtMiddleware = (req, res, next) => {
  try {
    let tokenData = req.headers.authorization;
    let token = tokenData.split(" ")[1];
    // console.log(token);
    let userdata = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
    console.log(userdata);
    req.user = userdata;
    next();
  } catch (error) {
    if (error.message == "invalid signature")
      next(new MyError(401, "Bu token bizni tizim tegishli emas"));
    next(error);
  }
};
export default jwtMiddleware;
