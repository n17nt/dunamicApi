import MyError from "../utils/customError.js";

let roleChecker = (roles) => {
  return (req, res, next) => {
    try {
      //   console.log(req.user, "userdata");
      //   console.log(roles);
      let user = req.user;
      if (!roles.includes(user.role))
        throw new MyError(401, "Sizga bu route ishlatish ruhsat yo'q");

      next();
    } catch (error) {
      next(error);
    }
  };
};
export default roleChecker;
