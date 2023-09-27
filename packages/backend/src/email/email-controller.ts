import { Request, Response } from "express";

import EmailService from "./emailService";

// TODO: Used for debugging, delete if not needed
export const sendEmailHandler = async (req: Request, res: Response) => {
    try {
        const email = "example@email.com";
        EmailService.sendEventEmail(email, "John", "The Awesome Event");
        res.status(200).send("Email sent");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error sending email");
    }
};
