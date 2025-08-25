import nodemailer from "nodemailer";
import { getCurrentDateFormatted } from "@/utils/getDate";

export const sendEmail = async () => {
	try {
		const transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			port: 465,
			secure: true,
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		});

		const info = await transporter.sendMail({
			from: '"Jordan Devaney" <jordandevaney28@gmail.com>',
			to: "jordandevaney28@gmail.com",
			subject: `Invoice for ${getCurrentDateFormatted()}`,
			text: `Here is my invoice for ${getCurrentDateFormatted()}`,
			html: `<p>Here is my invoice for ${getCurrentDateFormatted()}</p>`,
			attachments: [
				{
					filename: "buffer.txt",
					content: Buffer.from("Hello world!", "utf8"),
				},
			],
		});

		return `Message sent: ${info.messageId}`;
	} catch (error) {
		console.error("Email error:", error);
		throw new Error(`Failed to send email: ${error.message}`);
	}
};
