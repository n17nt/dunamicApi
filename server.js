import app from "./app.js";
import env from "dotenv";
import { connectDb } from "./config/db.js";
env.config();
connectDb();

let PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("server running");
});
