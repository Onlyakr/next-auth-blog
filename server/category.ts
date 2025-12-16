import prisma from "@/lib/prisma";

export const createCategory = async () => {
	await prisma.category.create({
		data: {
			name: "Beauty",
		},
	});
};
