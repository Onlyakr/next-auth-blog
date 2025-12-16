import Navbar from "@/components/navbar";

const UserLayout = ({ children }: { children: React.ReactNode }) => (
	<div className="flex min-h-screen flex-col">
		<Navbar />
		<main className="flex flex-1">{children}</main>
	</div>
);
export default UserLayout;
