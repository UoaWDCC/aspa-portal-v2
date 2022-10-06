import express from "express";
import cors from "cors";
import mongoose from "mongoose";

//TESTING
const bodyParser = require("body-parser"); // parser middleware
const session = require("express-session"); // session middleware
const passport = require("passport"); // authentication
const connectEnsureLogin = require("connect-ensure-login"); //authorization
const User = require("./models/user.js"); // User Model

const app = express();
const port = process.env.PORT || 5000;
const dbURL =
  process.env.DB_URL ||
  "mongodb+srv://wdcc:wdcc123@cluster0.dhxrxle.mongodb.net/?retryWrites=true&w=majority";

import eventRoute from "./routes/event.js";

app.use(cors());
app.use(express.json());

app.use("/event", eventRoute);

app.use(
  session({
    secret: "r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }, // 1 hour
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
