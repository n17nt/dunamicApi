import mongoose from "mongoose";

const connectDb = () => {
  try {
    mongoose
      .connect(process.env.DB_URL)
      .then(() => {
        console.log("DB connected...");
      })
      .catch((err) => {
        throw err;
      });
  } catch (error) {
    throw error;
  }
};

export { connectDb };
