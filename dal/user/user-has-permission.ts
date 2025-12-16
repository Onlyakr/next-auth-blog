import { getUserSession } from "./get-user-session";

export const userHasPermission = async () => {
	try {
		const session = await getUserSession();
		if (!session) {
			return {
				success: false,
				message: "Unauthorized",
			};
		}
		return { success: true, message: "Authorized" };
	} catch (error) {
		const e = error as Error;
		console.error(e.message);
		return {
			success: false,
			message: e.message || "Failed to check user permission.",
		};
	}
};
