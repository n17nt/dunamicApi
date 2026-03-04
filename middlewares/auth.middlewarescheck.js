import userModel from "../model/user.model.js";
import MyError from "../utils/customError.js";
const authCheck = async (req, res, next) => {
  try {
    const data = req.headers.authorization.split(" ")[1];
    const decoded = Buffer.from(data, "base64").toString("utf-8");
    let [username, password] = decoded.split(":");

    // console.log(username, password, "---pas3Useds");

    let user = await userModel.findOne({ username: username });
    // console.log(user);
    if (!user) throw new MyError(401, "User topilmadi");
    if (user.password !== password)
      throw new MyError(401, "login parol xato topilmadi");
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
export default authCheck;
