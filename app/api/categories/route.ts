import prisma from "@/lib/prisma";

export const GET = async () => {
	try {
		const categories = await prisma.category.findMany();
		return Response.json(categories, { status: 200 });
	} catch (error) {
		const e = error as Error;
		return Response.json(
			{ message: e.message || "Failed to fetch categories" },
			{ status: 500 }
		);
	}
};
