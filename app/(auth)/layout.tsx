import Link from "next/link";

const AuthLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex h-screen flex-col items-center justify-center gap-8">
    <Link className="font-bold text-5xl" href="/">
      Blog
      <span className="text-primary">bog</span>
    </Link>
    {children}
  </div>
);
export default AuthLayout;
