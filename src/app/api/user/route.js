import { updateUser } from "@/lib/updateUser";

export async function PUT(req) {
	try {
		const { id, address, city, state, zip, phone } = await req.json();

		const user = await updateUser(id, address, city, state, zip, phone);
		return Response.json(user);
	} catch (error) {
		return Response.json({ error: error.message }, { status: 500 });
	}
}
