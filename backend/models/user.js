import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  UPI: {
    type: String,
    required: true,
  },
  skillLevel: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced", "Pool Is Too Easy"],
    required: true,
  },
  previousMember: {
    type: Boolean,
    required: true,
  },
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

export default User;
