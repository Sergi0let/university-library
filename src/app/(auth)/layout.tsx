import Image from "next/image";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
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
