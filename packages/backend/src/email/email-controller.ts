import { Request, Response } from "express";

import EmailService from "./emailService";

// TODO: Used for debugging, delete if not needed
export const sendEmailHandler = async (req: Request, res: Response) => {
    const to = "example@email.com"; // Change to your recipient's email
    const subject = "Sending with SendGrid is Fun";
    const name = "John";
    const title = "WDCC UOA";
    const message = "You have registered for our event successfully!";

    try {
        await EmailService.sendEmail(to, subject, name, title, message);
        res.status(200).send("Email sent");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error sending email");
    }
};
