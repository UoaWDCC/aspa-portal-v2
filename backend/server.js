import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import passport from "passport";
import LocalStrategy from "passport-local";
import session from "express-session";
import flash from "express-flash";
import User from "./models/user.js";

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

// MAKE SURE TO CHANGE THE SESSIONCONFIG FOR PRODUCTION
const sessionConfig = {
  secret: "testSecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // expires after a week
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/event", eventRoute);
app.use("/user", userRoute);

mongoose
  .connect(dbURL)
  .then(() => console.log(`Connected to database`))
  .catch((error) => console.log(error));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
