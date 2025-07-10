import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { use } from "react";

const prisma = new PrismaClient();
export async function GET(req) {
	try {
		const { searchParams } = new URL(req.url);
		const userId = searchParams.get("userId");
		console.log(searchParams);

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
