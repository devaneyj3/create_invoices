import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const getUser = async (userEmail) => {
	const user = await prisma.user.findUnique({
		where: {
			email: userEmail,
		},
	});
	return user;
};
