"use client";

import { MoonIcon, SunIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
	const { setTheme, theme } = useTheme();

	return (
		<Button
			aria-label="Toggle theme"
			className="cursor-pointer"
			onClick={() => setTheme(theme === "light" ? "dark" : "light")}
			size="icon"
			variant="outline"
		>
			<HugeiconsIcon
				className="dark:-rotate-90 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:scale-0"
				icon={SunIcon}
			/>
			<HugeiconsIcon
				className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
				icon={MoonIcon}
			/>
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}
