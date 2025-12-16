import Link from "next/link";
import PageWrapper from "@/components/page-wrapper";

const NotFound = () => (
	<PageWrapper>
		<div className="flex flex-col items-center justify-center gap-4">
			<h1 className="font-bold text-2xl">Page not found.</h1>
			<Link className="text-blue-500 hover:text-blue-700" href="/">
				Go back to home
			</Link>
		</div>
	</PageWrapper>
);
export default NotFound;
