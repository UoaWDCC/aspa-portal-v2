import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

const conf = dotenv.config();
if (conf.error) {
    throw conf.error;
}
const apiKey = process.env.SENDGRID_API_KEY;
const fromEmail = process.env.SENDGRID_FROM_EMAIL;
if (apiKey == null) {
    throw new Error("SENDGRID_API_KEY is not defined in your environment.");
}
sgMail.setApiKey(apiKey);
export default class EmailService {
    public static async _sendEmail(
        to: string,
        subject: string,
        name: string,
        title: string,
        message: string
    ) {
        if (fromEmail == null) {
            throw new Error(
                "SENDGRID_FROM_EMAIL is not defined in your environment."
            );
        }
        // FIXME: This is a hacky way to use templates
        // setup a template_id in sendgrid and use that instead if possible
        const templatePath = path.join(
            __dirname,
            "./email-templates",
            `send-confirmation.html`
        );
        const html = fs
            .readFileSync(templatePath, "utf8")
            .replace(/{{name}}/g, name)
            .replace(/{{title}}/g, title)
            .replace(/{{message}}/g, message);

        console.log("finished loading file");

        const msg = {
            to,
            from: fromEmail,
            subject,
            html,
        };

        await sgMail.send(msg);
        console.log("Email sent");
        return;
    }

    public static async sendEventEmail(
        toEmail: string,
        name: string,
        eventName: string
    ) {
        const subject = `ASPA UOA ${eventName} Registration`;
        const title = "ASPA UOA";
        const message = `You have registered for ${eventName} successfully! 
        We look forward to seeing you there!`;
        await this._sendEmail(toEmail, subject, name, title, message);
    }
}
