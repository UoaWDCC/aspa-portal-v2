import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT || 5000;
const dbURL =
  process.env.DB_URL ||
  "mongodb+srv://123:123@cluster0.3rsko.mongodb.net/?retryWrites=true&w=majority";

import eventRoute from "./routes/event.js";

app.use(cors());
app.use(express.json());

app.use("/event", eventRoute);

mongoose
  .connect(dbURL)
  .then(() => console.log(`Connected to database`))
  .catch((error) => console.log(error));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
