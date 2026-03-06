import teacherModel from "../model/teacher.model.js";
import MyError from "../utils/customError.js";
import response from "../utils/response.function.js";

let getAllTeacher = async (req, res, next) => {
  try {
    let data = await teacherModel.find();
    response(res, 200, data, "Malumotlar muvaffaqiyatli olindi");
  } catch (error) {
    next(error);
  }
};

let createTeacher = async (req, res, next) => {
  try {
    let { name, phone } = req.body;
    if (!name || !phone) throw new MyError(400, "Malumotlar kiritish shart");
    let data = new teacherModel({ name, phone });
    await data.save();
    response(res, 201, data, "Malumotlar muvaffaqiyatli qo'shioldi");
  } catch (error) {
    next(error);
  }
};

let createTeacherWithPhoto = async (req, res, next) => {
  try {
    let { name, phone } = req.body;
    let photo;
    if (req.file) photo = req.file.filename;
    if (!name || !phone) throw new MyError(400, "Malumotlar kiritish shart");
    let data = new teacherModel({ name, phone, image: photo });
    await data.save();
    response(res, 201, data, "Malumotlar muvaffaqiyatli qo'shioldi");
  } catch (error) {
    next(error);
  }
};

export { getAllTeacher, createTeacher, createTeacherWithPhoto };
