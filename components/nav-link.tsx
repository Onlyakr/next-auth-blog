"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NavLink = ({
	children,
	href,
}: {
	children: React.ReactNode;
	href: string;
}) => {
	const pathname = usePathname();
	const isActive = pathname === href;

	return (
		<Link className={cn(isActive ? "text-primary" : "")} href={href}>
			{children}
		</Link>
	);
};
export default NavLink;
