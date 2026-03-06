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
let getAllStudentsAggregate = async (req, res, next) => {
  try {
    let data = await studentModel.aggregate([
      { $match: { mark: { $gt: 40 } } },
      //   { $group: { _id: "$subject", maksimalbaho: { $max: "$mark" } } },
      {
        $lookup: {
          foreignField: "_id",
          localField: "teacher_id",
          from: "teachers",
          as: "ustozlar",
        },
      },
      {
        $unwind: { path: "$ustozlar", preserveNullAndEmptyArrays: true },
      },
      {
        $project: {
          //   mark: 1,
          //   name: 1,
          //   ustozlar: 1,
          subject: 0,
        },
      },
      {
        $addFields: {
          teacherName: "$ustozlar.name",
        },
      },
    ]);
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
    let { name, subject, mark, teacher_id } = req.body;
    if (!name || !subject || !mark)
      throw new MyError(400, "Malumotlar kiritish shart");
    let data = new studentModel({ name, subject, mark, teacher_id });
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

export { getAllStudents, createStudents, getAllStudentsAggregate };
