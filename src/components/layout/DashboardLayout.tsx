import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <Navbar />
        <main className="flex-1 p-4 md:p-6 grid-bg">
          <div className="mx-auto max-w-[1600px] space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
}