const PageWrapper = ({ children }: { children: React.ReactNode }) => (
	<div className="container mx-auto mt-10 flex-1 p-4 sm:px-6 lg:px-8">
		{children}
	</div>
);
export default PageWrapper;
