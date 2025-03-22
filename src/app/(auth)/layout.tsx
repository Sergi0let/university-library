import { auth } from "@/lib/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (session) redirect("/");
  return (
    <div className="auth-container">
      <section className="auth-form bg-pattern">
        <div className="auth-box">
          <div className="flex items-center gap-3">
            <Image src="/icons/logo.svg" alt="Logo" width={37} height={37} />
            <h1 className="text-write text-2xl font-semibold">BookWise</h1>
          </div>

          <div>{children}</div>
        </div>
      </section>
      <section className="auth-illustration">
        <Image
          src="/images/auth-illustration.png"
          alt="Auth Illustration"
          height={1000}
          width={1000}
          className="size-full object-cover"
        />
      </section>
    </div>
  );
};

export default Layout;
