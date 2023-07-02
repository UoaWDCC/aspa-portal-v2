import { Request, Response, NextFunction } from "express";
import admin from "firebase-admin";

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        // No authentication token: assume guest user
        return next();
    }
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        console.log(decodedToken);
        req.decodedToken = decodedToken;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ error });
    }
};

export { verifyToken };
