import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import eventRoute from "../routes/event";
const cors = require("cors");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const dbURL =
    process.env.DB_URL ||
    "mongodb+srv://wdcc:wdcc123@cluster0.dhxrxle.mongodb.net/?retryWrites=true&w=majority";

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
