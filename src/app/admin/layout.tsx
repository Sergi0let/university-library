import Header from "@/components/admin/Header";
import Sidebar from "@/components/admin/Sidebar";
import { auth } from "@/lib/auth";
import "@/styles/admin.css";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { db } from "../../../database/drizzle";
import { users } from "../../../database/schema";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session?.user?.id) redirect("/sign-in");

  const isAdmin = await db
    .select({ isAdmin: users.role })
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1)
    .then((res) => res[0]?.isAdmin === "ADMIN");

  if (!isAdmin) redirect("/");

  return (
    <div className="flex min-h-screen w-full flex-row">
      <Sidebar session={session} />
      <div className="admin-container">
        <Header session={session} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
