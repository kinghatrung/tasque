import Sidebar from "~/components/common/Sidebar";
import type { ReactNode } from "react";

interface DefaultLayoutProps {
  children?: ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}

export default DefaultLayout;
