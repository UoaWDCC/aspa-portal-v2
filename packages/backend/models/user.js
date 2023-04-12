const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: String,
    email: String,
    university: String,
    student_id: Number,
    skill_level: String,
    events_attended: [mongoose.Types.ObjectId],
  }
);

const User = mongoose.model("User", userSchema);

export default User;