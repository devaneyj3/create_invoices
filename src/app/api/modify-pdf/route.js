import { getCurrentDateFormatted } from "@/utils/getDate";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { formatMoney } from "@/utils/formatMoney";

export async function POST(request) {
	try {
		// Get data from request body
		const { invoiceNum, amount } = await request.json();

		// Validate inputs
		if (!invoiceNum || !amount) {
			return new Response(
				JSON.stringify({ error: "Missing required fields" }),
				{ status: 400 }
			);
		}

		const blue = rgb(34 / 255, 100 / 255, 159 / 255);

		// Create a new PDF document and embed the Times Roman font
		const pdfDoc = await PDFDocument.create();
		const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
		const timesRomanBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
		const timesRomanItalic = await pdfDoc.embedFont(
			StandardFonts.TimesRomanItalic
		);

		// Add a page (using standard Letter dimensions: 612 x 792)
		const page = pdfDoc.addPage([612, 792]);
		const { width, height } = page.getSize();

		// Helper function to draw text with coordinates based on the page height.
		const drawText = (
			text,
			x,
			y,
			fontSize,
			color = rgb(0, 0, 0),
			font = timesRomanFont
		) => {
			page.drawText(text, {
				x,
				y: height - y,
				size: fontSize,
				color,
				font,
			});
		};

		// --- Replicating the Invoice Layout ---
		drawText("JORDAN DEVANEY", 50, 100, 14, undefined, timesRomanBold);
		drawText(
			"Full Stack Web Developer",
			50,
			120,
			11,
			undefined,
			timesRomanItalic
		);
		drawText("INVOICE", 400, 100, 26, blue, timesRomanBold);

		// Contact Information (Left side)
		drawText("Street Address", 50, 160, 12, undefined, timesRomanBold);
		drawText("Whitmore Lake, MI", 50, 175, 12);
		drawText("810.772.0086", 50, 190, 12);

		// Invoice Details (Right side)
		drawText(
			`INVOICE#: 2025-${invoiceNum}`,
			400,
			160,
			11,
			blue,
			timesRomanBold
		);
		drawText(
			`DATE: ${getCurrentDateFormatted()}`,
			400,
			175,
			11,
			blue,
			timesRomanBold
		);

		// Service/Project Details
		drawText("FOR WEB DEVELOPMENT &", 400, 230, 12, undefined, timesRomanBold);
		drawText("REGISTRATION", 400, 245, 12, undefined, timesRomanBold);

		// Bill To Section
		drawText("TO", 50, 230, 12, undefined, timesRomanBold);
		drawText("AG-USA LLC", 50, 245, 12);
		drawText("119 PALMETTO", 50, 260, 12);
		drawText("ROAD", 50, 275, 12);
		drawText("TYRONE, GA 30290", 50, 290, 12);
		drawText("888-588-3139", 50, 305, 12);

		// Table Headers for Description and Amount
		drawText("Description", 50, 400, 12, blue, timesRomanBold);
		drawText("Amount", 500, 400, 12, blue, timesRomanBold);

		// Service Row
		drawText("Web Development", 50, 420, 12, undefined, timesRomanBold);
		drawText(
			`${getCurrentDateFormatted()}`,
			300,
			420,
			12,
			undefined,
			timesRomanBold
		);
		drawText(`${formatMoney(amount)}`, 500, 420, 12);

		// Payment Instructions
		drawText("Make all checks payable to JORDAN DEVANEY", 50, 480, 12);
		drawText("is due within 30 days.", 50, 510, 12);

		// Footer / Additional Information
		drawText(
			"If you have any questions concerning this invoice, contact Jordan Devaney at 810.772.0086",
			50,
			550,
			12
		);

		// Save the PDF and return as a response
		const pdfBytes = await pdfDoc.save();
		const buffer = Buffer.from(pdfBytes);

		return new Response(buffer, {
			status: 200,
			headers: {
				"Content-Type": "application/pdf",
				"Content-Disposition": `attachment; filename="invoice_${getCurrentDateFormatted()}.pdf"`,
			},
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
