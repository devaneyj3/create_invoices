import { cronJob } from "@/utils/cronjob";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const result = cronJob();
		return NextResponse.json({ ok: true, result });
	} catch (error) {
		return NextResponse.json(
			{ ok: false, error: error.message },
			{ status: 500 }
		);
	}
}
