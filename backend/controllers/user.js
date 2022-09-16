import User from "../models/user.js";

export const getUsers = async (req, res) => {
  console.log("GET ALL USERS");
  try {
    const users = await User.find({});
    console.log(users);
    res.json(users);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const email = req.params.email;
    console.log("GET USER " + email);
    const user = await User.find({ email });
    console.log(user[0]);
    res.json(user[0]);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    // CHECK IF USER DETAILS ARE VALID FIRST (todo)

    const userDetails = req.body;
    console.log(`CREATE USER ${userDetails.firstName} ${userDetails.lastName}`);
    const user = new User({
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      email: userDetails.email,
      UPI: userDetails.UPI,
      skillLevel: userDetails.skillLevel,
      previousMember: userDetails.previousMember,
    });
    await user.save();
    console.log(user);
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const editUser = async (req, res) => {
  try {
    const email = req.params.email;
    console.log("EDIT USER " + email);
    const userData = req.body;
    const user = await User.findOneAndUpdate({ email: email }, userData);
    console.log(user);
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
