import type { ReactNode } from "react";

import Sidebar from "~/components/common/Sidebar";
import Header from "~/components/common/Header";

interface DefaultLayoutProps {
  children?: ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen">
        <Header />
        <div className="flex-1 p-5 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
