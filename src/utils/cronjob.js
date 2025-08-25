import cron from "node-cron";
import { sendEmail } from "./sendEmail";

export const cronJob = () => {
	cron.schedule("* * * * *", () => {
		sendEmail();
	});
};
