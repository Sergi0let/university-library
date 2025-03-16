import Header from "@/components/Header";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="root-container bg-pattern">
      <div className="mx-auto max-w-7xl">
        <Header />
        <main className="mt-20 pb-20">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
