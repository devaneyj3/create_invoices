import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

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

	if (!userId || !invoiceNumber || amount == null || !companyName) {
		return NextResponse.json(
			{
				error:
					"userId, invoiceNumber, amount, and companyName are required",
			},
			{ status: 400 }
		);
	}

	try {
		const newInvoice = await prisma.invoice.create({
			data: {
				userId,
				invoiceNumber: invoiceNumber.toString(),
				date: new Date(),
				amount,
				to: companyName,
				description: jobDescription || "",
			},
		});
		return NextResponse.json(newInvoice);
	} catch (error) {
		console.error("Error creating invoice:", error);
		return NextResponse.json(
			{
				error: "Failed to create invoice",
				detail: error.message,
			},
			{ status: 500 }
		);
	}
}
