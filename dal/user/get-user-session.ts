import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export const getUserSession = async () => {
	try {
		const session = await auth.api.getSession({
			headers: await headers(),
		});
		return session;
	} catch (error) {
		console.error(error);
	}
};
