import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT || 5000;
const dbURL =
  process.env.DB_URL ||
  "mongodb+srv://wdcc:wdcc123@cluster0.dhxrxle.mongodb.net/?retryWrites=true&w=majority";

import eventRoute from "./routes/event.js";

app.use(cors());
app.use(express.json());

app.use("/event", eventRoute);

mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Connected to database`))
  .catch((error) => console.log(error));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
