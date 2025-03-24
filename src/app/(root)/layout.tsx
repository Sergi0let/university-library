import Header from "@/components/Header";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { after } from "next/server";
import { ReactNode } from "react";
import { db } from "../../../database/drizzle";
import { users } from "../../../database/schema";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session) redirect("/sign-in");

  // оновлення на сервіри поля lastActivityDate
  after(async () => {
    if (!session?.user?.id) return;
    // get the user and see  if the last activity date today
    const user = await db.select().from(users).where(eq(users.id, session?.user?.id)).limit(1);

    if (user[0].lastActivityDate === new Date().toISOString().slice(0, 10)) {
      return;
    }

    await db
      .update(users)
      .set({ lastActivityDate: new Date().toISOString().slice(0, 10) })
      .where(eq(users.id, session?.user?.id));
  });

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
