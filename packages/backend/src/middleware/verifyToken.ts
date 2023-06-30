import { NextFunction } from "express";

import admin from "firebase-admin";

const verifyToken = async (req: any, res: any, next: NextFunction) => {
    const authToken = req.headers.authorization?.split(" ")[1];

    if (!authToken) {
        // No authentication token: assume guest user
        req.userId = null;
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

export { verifyToken };
