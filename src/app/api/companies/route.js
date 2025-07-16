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

export async function POST(request) {
	try {
		const data = await request.json();

		const existingCompany = await prisma.company.findUnique({
			where: { companyName: data.companyName },
		});

		if (existingCompany) {
			return NextResponse.json(
				{ success: false, error: "You already created this company" },
				{ status: 400 }
			);
		}

		const newCompany = await prisma.company.create({
			data: {
				companyName: data.companyName,
				companyAddress: data.companyAddress,
				companyCity: data.companyCity,
				companyState: data.companyState,
				companyZip: data.companyZip,
				userId: data.userId,
			},
		});

		return NextResponse.json({ success: true, company: newCompany });
	} catch (error) {
		console.error("Error creating company:", error);
		return NextResponse.json(
			{ success: false, error: "Failed to create company" },
			{ status: 500 }
		);
	}
}
