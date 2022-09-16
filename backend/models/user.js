import mongoose from "mongoose";

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

const User = mongoose.model("User", userSchema);

export default User;
