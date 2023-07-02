import { NextFunction } from "express";

const User = require("../models/user");
const admin = require("firebase-admin");

const verifyToken = async (req: any, res: any, next: NextFunction) => {
  const authToken = req.headers.authorization?.split(" ")[1];

  if (!authToken) {
    // Do guest stuff maybe?
    return res.status(401).json({ error: "You are not authorized" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(authToken);
    req.userId = decodedToken.uid;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "You are not authorized" });
  }
};

module.exports = verifyToken;
