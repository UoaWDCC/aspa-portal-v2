import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import eventRoute from "./event/event-route";
import userRoute from "./user/user-route";
import registerRoute from "./register/register-route";
import paymentRoute from "./payment/payment-route";
import webhookRoute from "./webhook/webhook-route"
import cors from "cors";
import { verifyToken } from "./middleware/verifyToken";
import firebase_admin from "firebase-admin";

const conf = dotenv.config();
if (conf.error) {
    throw conf.error;
}

const app = express();
const port = process.env.PORT || 5000;
const dbURL = `${process.env.DB_URL}`;
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};
firebase_admin.initializeApp(firebaseConfig);
app.use(cors());
app.use(express.json());
app.use(verifyToken);

app.use("/events", eventRoute);
app.use("/users", userRoute);
app.use("/register", registerRoute);
app.use("/payment", paymentRoute);
app.use("/stripe_webhooks", webhookRoute);

mongoose
    .connect(dbURL)
    .then(() => {
        app.listen(port, () => {
            console.log(
                `Connected to database. Server is running on port: ${port}`
            );
        });
    })
    .catch((error) => {
        console.log(error);
    });
