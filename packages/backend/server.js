import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const dbURL =
  process.env.DB_URL ||
  "mongodb+srv://wdcc:wdcc123@cluster0.dhxrxle.mongodb.net/?retryWrites=true&w=majority";

import eventRoute from "./routes/event.js";
import userRoute from "./routes/user.js";

app.use(cors());
app.use(express.json());

app.use("/event", eventRoute);
app.use("/users", userRoute)

mongoose
  .connect(dbURL)
  .then(() => {
    app.listen(port, () => {
      console.log(`Connected to MongoDB. Server is running on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
