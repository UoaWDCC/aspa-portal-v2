import { Request, Response } from "express";

import sgMail from "@sendgrid/mail";

require("dotenv").config();

// Now you can access environment variables using process.env
const sendgridApiKey = process.env.SENDGRID_API_KEY;

// Ensure that sendgridApiKey is defined and not undefined before using it
if (!sendgridApiKey) {
  console.error("SENDGRID_API_KEY is not defined in your environment.");
} else {
  sgMail.setApiKey(sendgridApiKey);
}

export const sendEmail = async (
  to: string,
  from: string,
  subject: string,
  text: string,
  html: string
) => {
  const msg = {
    to, // Recipient's email
    from, // Sender's email (should be a verified sender in SendGrid)
    subject, // Email subject
    text, // Plain text version of the email
    html, // HTML version of the email
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent");
    return "Email sent";
  } catch (error) {
    console.error(error);
    throw new Error("Error sending email");
  }
};

export const sendEmailHandler = async (req: Request, res: Response) => {
  const to = "cjstevensnz@gmail.com"; // Change to your recipient's email
  const from = "cste303@aucklanduni.ac.nz"; // Change to your verified sender's email
  const subject = "Sending with SendGrid is Fun";
  const text = "and easy to do anywhere, even with Node.js";
  const html = "<strong>and easy to do anywhere, even with Node.js</strong>";

  try {
    const result = await sendEmail(to, from, subject, text, html);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error sending email");
  }
};
