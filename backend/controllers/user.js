import User from "../models/user.js";

export const getUser = async (req, res) => {
  try {
    const email = req.params;
    const user = await User.findOne({ email });
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      upi,
      skillLevel,
      previousMember,
      username,
      password,
    } = req.body;
    const user = new User({
      firstName,
      lastName,
      email,
      upi,
      skillLevel,
      previousMember,
      username,
    });
    const registeredUser = await User.register(user, password);
    console.log(registeredUser);
    res.json(registeredUser);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const authenticateUser = async (req, res) => {
  try {
    console.log("Logged in successfully!");
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const editUser = async (req, res) => {
  try {
    const email = req.params;
    const userData = req.body;
    const user = await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      userData
    );
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
