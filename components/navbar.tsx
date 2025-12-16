import { LicenseDraftIcon, Menu01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { getUserSession } from "@/dal/user/get-user-session";
import NavLink from "./nav-link";
import SearchBar from "./searchbar";
import SignoutButton from "./signout-button";
import { ThemeToggle } from "./theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { buttonVariants } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Navbar = async () => {
	const session = await getUserSession();

	return (
		<header className="sticky top-0 z-50 w-full bg-background/70 shadow-sm backdrop-blur-lg">
			<nav className="container mx-auto flex items-center justify-between p-4 sm:px-6 lg:px-8">
				<Link className="flex items-center gap-2 font-medium text-2xl" href="/">
					<HugeiconsIcon className="size-8" icon={LicenseDraftIcon} />
					Blog
				</Link>

				{session && (
					<div className="hidden items-center gap-8 lg:flex">
						<NavLink href="/">Posts</NavLink>
						<NavLink href="/create">Create</NavLink>
					</div>
				)}

				<SearchBar />

				{/* Mobile menu */}
				<div className="lg:hidden">
					<DropdownMenu>
						<DropdownMenuTrigger className="size-8 cursor-pointer">
							<HugeiconsIcon icon={Menu01Icon} />
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							{session ? (
								<>
									<DropdownMenuItem>
										<Link className="w-full text-center" href="/">
											Home
										</Link>
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem>
										<Link className="w-full text-center" href="/">
											Posts
										</Link>
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem>
										<Link className="w-full text-center" href="/my-posts">
											My posts
										</Link>
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem className="p-0" variant="destructive">
										<SignoutButton className="w-full hover:bg-transparent hover:text-destructive" />
									</DropdownMenuItem>
								</>
							) : (
								<>
									<DropdownMenuItem>
										<Link className="w-full text-center" href="/">
											Home
										</Link>
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem>
										<Link className="w-full text-center" href="/sign-in">
											Sign In
										</Link>
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem>
										<Link className="w-full text-center" href="/sign-up">
											Sign Up
										</Link>
									</DropdownMenuItem>
									<DropdownMenuSeparator />
								</>
							)}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				{/* Desktop menu */}
				<div className="hidden w-[200px] items-center justify-center gap-8 lg:flex">
					{session ? (
						<div className="flex items-center gap-4">
							<DropdownMenu>
								<DropdownMenuTrigger className="cursor-pointer">
									<Avatar>
										<AvatarImage src={session.user?.image as string} />
										<AvatarFallback>
											{session.user.name.charAt(0)}
										</AvatarFallback>
									</Avatar>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuItem>
										<Link className="w-full text-center" href="/">
											Profile
										</Link>
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem>
										<Link className="w-full text-center" href="/my-posts">
											My posts
										</Link>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
							<SignoutButton variant="destructive" />
						</div>
					) : (
						<>
							<Link
								className={`${buttonVariants({ variant: "secondary" })}`}
								href="/sign-in"
							>
								Sign In
							</Link>

							<Link
								className={`${buttonVariants({ variant: "default" })}`}
								href="/sign-up"
							>
								Sign Up
							</Link>
						</>
					)}
					<ThemeToggle />
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
