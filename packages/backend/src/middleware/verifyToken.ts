import { NextFunction } from "express";

const User = require("../user/user-model");
const admin = require("firebase-admin");

const verifyToken = async (req: any, res: any, next: NextFunction) => {
  const authToken = req.headers.authorization?.split(" ")[1];

  if (!authToken) {
    // No authentication token: assume guest user
    req.user = null;
    return next();
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
