const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
const dbURL =
  process.env.DB_URL ||
  "mongodb+srv://123:123@cluster0.3rsko.mongodb.net/?retryWrites=true&w=majority";

const userRoute = require("./routes/user.js");

app.use(cors());
app.use(express.json());

app.use("/user", userRoute);

mongoose
  .connect(dbURL)
  .then(() => console.log(`Connected to database`))
  .catch((error) => console.log(error));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
