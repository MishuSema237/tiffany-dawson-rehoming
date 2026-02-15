import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "465"),
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

interface MailOptions {
    to: string;
    subject: string;
    text: string;
    html?: string;
    replyTo?: string;
}

export async function sendMail({ to, subject, text, html, replyTo }: MailOptions) {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
        throw new Error("SMTP credentials not configured");
    }

    try {
        const info = await transporter.sendMail({
            from: `"Tiffany Dawson's Rehoming" <${process.env.SMTP_USER}>`,
            to,
            subject,
            text,
            html,
            replyTo: replyTo || process.env.SMTP_USER,
        });
        console.log("Email sent: %s", info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
}
