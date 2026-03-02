import mongoose from "mongoose";

let studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    mark: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    teacher_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "teacher",
    },
  },
  {
    // timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
export default mongoose.model("student", studentSchema);
