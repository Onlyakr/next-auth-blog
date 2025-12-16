import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

const EditPostButton = ({
	className,
	slug,
}: {
	className?: string;
	slug: string;
}) => (
	<Link
		className={cn(className, buttonVariants({ variant: "outline" }))}
		href={`/posts/${slug}/edit`}
	>
		Edit
	</Link>
);
export default EditPostButton;
