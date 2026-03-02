import studentModel from "../model/student.model.js";
import teacherModel from "../model/teacher.model.js";
import MyError from "../utils/customError.js";

let getAllStudents = async (req, res, next) => {
  try {
    let data = await studentModel.find();
    res.json({
      message: "Malumotlar muvaffaqiyatli olindi",
      status: "succes",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

let createStudents = async (req, res, next) => {
  try {
    let { name, subject, mark } = req.body;
    if (!name || !subject || !mark)
      throw new MyError(400, "Malumotlar kiritish shart");
    let data = new studentModel({ name, subject, mark });
    await data.save();
    res.json({
      message: "Malumotlar muvaffaqiyatli olindi",
      status: "succes",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

export { getAllStudents, createStudents };
