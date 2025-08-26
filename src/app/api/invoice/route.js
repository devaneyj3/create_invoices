import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getCurrentDateFormatted } from "@/utils/getDate";

const prisma = new PrismaClient();
export async function GET(req) {
	try {
		const { searchParams } = new URL(req.url);
		const userId = searchParams.get("userId");

		if (!userId) {
			return NextResponse.json(
				{ error: "User ID is required" },
				{ status: 400 }
			);
		}
		const invoices = await prisma.invoice.findMany({
			where: { userId },
			orderBy: { date: "asc" },
		});

		return NextResponse.json(invoices);
	} catch (error) {
		console.error("Error fetching invoices:", error);
		return NextResponse.json(
			{ error: "Failed to fetch invoices" },
			{ status: 500 }
		);
	}
}

export async function POST(req) {
	const { invoiceNumber, jobDescription, amount, userId, companyName } =
		await req.json();

	let date = getCurrentDateFormatted();

	//formate into ISO-8601 Datetime Format for the database
	date = date ? new Date(date) : new Date();

	try {
		const newInvoice = await prisma.invoice.create({
			data: {
				userId: userId,
				invoiceNumber: invoiceNumber.toString(),
				date: date,
				amount: amount,
				to: companyName,
				description: jobDescription,
			},
		});
		return NextResponse.json(newInvoice);
	} catch (error) {
		console.error(error);
		return NextResponse.json({
			error: "Failed to create invoice",
			status: 500,
		});
	}
}
