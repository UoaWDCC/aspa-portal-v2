import { Request, Response, NextFunction } from "express";
import { User } from "../user/user-model";

const verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {
  if (req.userFbId === "guest") {
    req.userRole = "user";
    return next();
  }
  const user = await User.findOne({ firebaseId: req.userFbId });
  const userRole = user?.role;
  if (userRole == "admin") {
    req.userRole = userRole;
    return next();
  } else {
    req.userRole = "user";
    return next();
  }
};

export { verifyAdmin };
