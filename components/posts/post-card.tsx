import Link from "next/link";
import type { Category, User } from "@/lib/generated/prisma/client";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";

export type PostCardProps = {
	post: {
		title: string;
		category: Category;
		author: User;
		content: string;
		slug: string;
		authorId: string;
		categoryId: string;
		imageUrl?: string | null;
	};
};

const PostCard = ({ post }: PostCardProps) => (
	<Card className="w-full max-w-xl transition-shadow duration-300 hover:shadow-lg">
		<CardHeader>
			<CardTitle>{post.title}</CardTitle>
			<CardDescription className="flex gap-2">
				<Badge>Category: {post.category.name}</Badge>
				<Badge>Author: {post.author.name}</Badge>
			</CardDescription>
		</CardHeader>
		<CardContent>{post.content}</CardContent>
		<CardFooter>
			<Link href={`/posts/${post.slug}`}>
				<Button variant="outline">Read more</Button>
			</Link>
		</CardFooter>
	</Card>
);
export default PostCard;
