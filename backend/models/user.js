const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
});

userSchema.plugins(passportLocalMongoose);

module.exports = mongoose.model("userData", userSchema, "userData");
