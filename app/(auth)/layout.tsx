import { LicenseDraftIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

const AuthLayout = ({ children }: { children: React.ReactNode }) => (
	<div className="flex h-screen flex-col items-center justify-center gap-8 p-4">
		<Link className="flex items-center gap-2 font-medium text-2xl" href="/">
			<HugeiconsIcon className="size-8" icon={LicenseDraftIcon} />
			Blog
		</Link>
		{children}
	</div>
);
export default AuthLayout;
