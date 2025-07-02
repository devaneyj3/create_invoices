import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const updateUser = async (
	id,
	address,
	addressCity,
	addressState,
	addressZip,
	phone
) => {
	try {
		const user = await prisma.user.update({
			where: {
				id: id,
			},
			data: {
				address: address,
				city: addressCity,
				state: addressState,
				zip: addressZip,
				phone: phone || null, // Keep as string or null
			},
		});
		return user;
	} catch (error) {
		console.error("Error updating user:", error);
		throw error;
	}
};
