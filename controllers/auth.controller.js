import userModel from "../model/user.model.js";
import { loginAuthSchema, registerAuthSchema } from "../schemas/auth.schema.js";
import MyError from "../utils/customError.js";
import senderMail from "../utils/mail.js";
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

let resetPassword = async (req, res, next) => {
  try {
    let { password, newPassword } = req.body;
    let user_id = req.user.id;
    if (password === newPassword)
      throw new MyError(400, "Yangi passowrd eski bir xil berding");

    let user = await userModel.findById(user_id).select("+password");
    console.log(user);

    let checkPass = user.hashCheck(password);
    if (!checkPass) throw new MyError(401, "Eski passowrd kirildi");

    user.password = newPassword;
    await user.save();
    user.password = undefined;
    response(res, 200, { user: user }, "User paroli yangilandi");
  } catch (error) {
    next(error);
  }
};

let forgetPassword = async (req, res, next) => {
  try {
    let { email } = req.body;

    let user = await userModel.findOne({ email });
    console.log(user);
    if (!user) throw new MyError(404, "Bunaqa eail yo'q");
    let otpCode = Math.floor(Math.random() * 900000 + 100000);
    let otpTime = new Date(Date.now() + 5 * 60 * 1000);
    user.otp_code = otpCode;
    user.otp_date = otpTime;
    await user.save();
    console.log(otpCode, otpTime);
    senderMail(
      `
        We heard that you lost your GitHub password. Sorry about that!

        But don’t worry! You can use the following button to reset your password:`,
      user.email,
      otpCode,
    );
    response(res, 200, {}, "Sizni emailga xat jo'natildi");
  } catch (error) {
    next(error);
  }
};
let updatePasswordwithOtp = async (req, res, next) => {
  try {
    let { otpCode, newPassword } = req.body;
    let user = await userModel.findOne({
      otp_code: otpCode,
    });

    if (!user) throw new MyError("User topilmadi");
    let userOtpDate = user.otp_date;
    user.otp_code = null;
    user.otp_date = null;
    await user.save();

    if (!(userOtpDate >= new Date())) throw new MyError("vaqti o'tgan");
    user.password = newPassword;
    await user.save();
    user.password = undefined;
    response(res, 200, { user }, "Sizni parolingiz yangilandi");
  } catch (error) {
    next(error);
  }
};

export {
  register,
  login,
  getMe,
  refreshToken,
  resetPassword,
  forgetPassword,
  updatePasswordwithOtp,
};
