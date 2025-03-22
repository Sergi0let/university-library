import Header from "@/components/Header";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session) redirect("/sign-in");

  return (
    <div className="root-container bg-pattern">
      <div className="mx-auto max-w-7xl">
        <Header session={session} />
        <main className="mt-20 pb-20">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
