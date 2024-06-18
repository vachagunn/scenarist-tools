import { getSession } from "@/server/auth/session";
import { redirect } from "next/navigation";
import { type FC, type ReactNode } from "react";
import DashboardNav from "./_components/nav";

const DashboardLayout: FC<{ children: ReactNode }> = async ({ children }) => {
  const session = await getSession();
  if (!session) redirect("/auth");

  return (
    <div className="grid h-full grid-cols-[100px_1fr]">
      <div className="border-r">
        <DashboardNav />
      </div>
      <div className="container py-10">{children}</div>
    </div>
  );
};

export default DashboardLayout;
