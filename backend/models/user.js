import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    String,
    required: true,
  },
  email: {
    String,
    required: true,
  },
  UPI: {
    String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
