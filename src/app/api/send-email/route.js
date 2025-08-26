import { NextResponse } from "next/server";
import { sendEmail } from "../../../utils/sendEmail";

export async function POST(request) {
	try {
		const { pdfBuffer } = await request.json();

		// Validate required data
		if (!pdfBuffer) {
			return NextResponse.json(
				{ error: "PDF buffer is required" },
				{ status: 400 }
			);
		}

		// Send email with PDF data
		const result = await sendEmail(pdfBuffer);

		return NextResponse.json({
			success: true,
			message: "Email sent successfully",
			result,
		});
	} catch (error) {
		console.error("Error sending email:", error);
		return NextResponse.json(
			{ error: "Failed to send email. Please try again." },
			{ status: 500 }
		);
	}
}
