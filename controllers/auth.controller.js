import userModel from "../model/user.model.js";
import { loginAuthSchema, registerAuthSchema } from "../schemas/auth.schema.js";
import MyError from "../utils/customError.js";
import response from "../utils/response.function.js";
import { generatorAccesToken, generatorRefreshToken } from "../utils/token.js";

import jwt from "jsonwebtoken";

let register = async (req, res, next) => {
  try {
    let { username, password, email } = req.body;
    let user = await userModel.create({ username, password, email });

    // delete user.password;
    user.password = undefined;
    response(res, 200, user, "User is registred!!!");
  } catch (error) {
    next(error);
  }
};
let login = async (req, res, next) => {
  try {
    let { login, password } = req.body;
    let user = await userModel.findOne({ username: login }).select("+password");
    if (!user) throw new MyError(404, "Bunaqa foydalanuvch mavjud emas");

    let check = user.hashCheck(password);
    if (!check) throw new MyError(401, "Parol xato");

    user.password = undefined;
    user = user.toObject();

    let accesToken = await generatorAccesToken({
      id: user.id,
      role: user.role,
    });
    let refreshToken = await generatorRefreshToken({ id: user.id });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 24 * 60 * 60 * 1000, // Cookie expires after 15 minutes (900000 ms)
      httpOnly: true, // Cookie is not accessible via client-side JavaScript
      secure: process.env.DEV == "PRO", // Cookie is only sent over HTTPS (use false for development on localhost)
    });
    response(res, 200, { token: accesToken, ...user }, "User is registred!!!");
  } catch (error) {
    next(error);
  }
};
let getMe = async (req, res, next) => {
  try {
    let id = req.user.id;
    let user = await userModel.findById(id).lean();
    response(res, 200, user, "User ma'lumotlari qaytarildi");
  } catch (error) {
    next(error);
  }
};
let refreshToken = async (req, res, next) => {
  try {
    console.log(req.cookies);
    let refresh = req.cookies.refreshToken;
    if (!refresh)
      throw new MyError(401, "Sizda token mavjud emas qayta login qiling");
    let userdata = jwt.verify(refresh, process.env.REFRESH_SECRET_KEY);
    // let user = await userModel.findById(id).lean();
    console.log(userdata);
    let user = await userModel.findById(userdata.id).lean();

    if (!user) throw new MyError(404, "Bunaqa User mavjud emas");
    let accesToken = await generatorAccesToken({
      id: user.id,
      role: user.role,
    });
    response(res, 200, { token: accesToken }, "User ma'lumotlari qaytarildi");
  } catch (error) {
    next(error);
  }
};

export { register, login, getMe, refreshToken };
