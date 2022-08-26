import User from "../models/user.js";

export const getUser = async (req, res) => {
  try {
    const email = req.params;
    const user = await User.find({ email: email.toLowerCase() });
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    // CHECK IF USER DETAILS ARE VALID FIRST (todo)

    const userDetails = req.body;
    const user = new User({
      name: userDetails.name,
      email: userDetails.email,
      UPI: userDetails.upi,
    });
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
