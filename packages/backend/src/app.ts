import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import eventRoute from "./routes/event";
import userRoute from "./routes/user";
import registerRoute from "./routes/register";
import cors from "cors";

const conf = dotenv.config();
if (conf.error) {
  throw conf.error;
}

const app = express();
const port = process.env.PORT || 5000;
const dbURL = `${process.env.DB_URL}`;
app.use(cors());
app.use(express.json());

app.use("/events", eventRoute);
app.use("/users", userRoute);
app.use("/register", registerRoute);

mongoose
  .connect(dbURL)
  .then(() => {
    app.listen(port, () => {
      console.log(`Connected to database. Server is running on port: ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
