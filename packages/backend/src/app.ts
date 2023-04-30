import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import eventRoute from "./event/event-route";
import userRoute from "./user/user-route";
import registerRoute from "./register/register-route";
import paymentRoute from "./payment/payment-route";

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
app.use("/payment", paymentRoute);

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
