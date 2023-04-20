import User from "../models/user.js";

export const getUsers = async (req, res) => {
  try {
    const events = await User.find({});
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(404).json(error);
  }
};

export const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(404).json(error);
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, university, student_id, skill_level } = req.body;
    if (name && email && university && student_id && skill_level) {
      const new_user = await User.create({
        name: name,
        email: email,
        university: university,
        student_id: student_id,
        skill_level: skill_level,
        events_attended: [],
      });
      res.status(201).json(new_user);
    } else {
      res.status(400).json({ message: "Missing required fields" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, university, student_id, skill_level, events_attended } =
      req.body;

    const update_object = {};
    if (name) update_object.name = name;
    if (email) update_object.email = email;
    if (university) update_object.university = university;
    if (student_id) update_object.student_id = student_id;
    if (skill_level) update_object.skill_level = skill_level;
    if (events_attended) update_object.events_attended = events_attended;

    const updated_user = await User.findByIdAndUpdate(userId, update_object, {new: true});

    res.status(200).json(updated_user);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};

export const addEvent = async (req, res) => {
  try {
    const { userId } = req.params;
    const { event_id } = req.body;

    const updated_user = await User.findByIdAndUpdate(userId, {$push: {"events_attended": event_id}}, {new: true});
    
    res.status(200).json(updated_user);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
}

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const deleted_user = await User.findByIdAndDelete(userId);
    res.status(200).json(deleted_user);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};
