import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/companies?userId=123
export async function GET(request) {
	try {
		const { searchParams } = new URL(request.url);
		const userId = searchParams.get("userId");

		if (!userId) {
			return NextResponse.json(
				{ error: "User ID is required" },
				{ status: 400 }
			);
		}

		const companies = await prisma.company.findMany({
			where: { userId },
			orderBy: { companyName: "asc" },
		});

		return NextResponse.json(companies);
	} catch (error) {
		console.error("Error fetching companies:", error);
		return NextResponse.json(
			{ error: "Failed to fetch companies" },
			{ status: 500 }
		);
	}
}
