import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const usersSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 6,
      maxLength: 15,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["admin", "director", "manager", "user"],
      default: "user",
    },
    avatar: { type: String, default: "avatar.png" },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

usersSchema.pre("save", function () {
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});

usersSchema.methods.hashCheck = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export default mongoose.model("users", usersSchema);
