"use client";

import { Menu01Icon, Search02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { Button, buttonVariants } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";

const Navbar = () => {
  const router = useRouter();

  const handleClick = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/70 shadow-sm backdrop-blur-lg">
      <nav className="container mx-auto flex items-center justify-between p-4 sm:px-6 lg:px-8">
        <Link className="font-bold text-2xl" href="/">
          Blog
          <span className="text-primary">bog</span>
        </Link>

        <div className="hidden w-full max-w-xs sm:block">
          <InputGroup>
            <InputGroupInput placeholder="Search..." />
            <InputGroupAddon>
              <HugeiconsIcon icon={Search02Icon} />
            </InputGroupAddon>
          </InputGroup>
        </div>

        <div>
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <HugeiconsIcon icon={Menu01Icon} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Hello</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="hidden gap-4 md:flex">
            <Link
              className={`${buttonVariants({ variant: "outline" })}`}
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
            <Button onClick={handleClick} variant="destructive">
              Sign Out
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
