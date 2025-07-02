import { getUser } from "@/lib/getUser";
import { updateUser } from "@/lib/updateUser";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
	try {
		const { email } = await req.json();
		if (!email) {
			return Response.json({ error: "Email is required" }, { status: 400 });
		}
		const user = await getUser(email);
		return Response.json(user);
	} catch (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}
}
export async function PUT(req) {
	try {
		const { id, address, city, state, zip, phone } = await req.json();

		const user = await updateUser(id, address, city, state, zip, phone);
		return Response.json(user);
	} catch (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}
}
