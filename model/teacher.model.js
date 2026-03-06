import mongoose from "mongoose";
let teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: ["Kiritish shart", true],
  },
  phone: {
    type: String,
    unique: ["Yagona bolishi shart", true],
  },
  image: {
    type: String,
  },
});
export default mongoose.model("teacher", teacherSchema);
