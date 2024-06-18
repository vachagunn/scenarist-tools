import { cn } from "@/lib/utils";
import { type FC, type HTMLAttributes } from "react";

const DashboardSection: FC<
  HTMLAttributes<HTMLDivElement> & { dashboardSection: { title: string } }
> = ({ dashboardSection: { title }, className, children, ...props }) => {
  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      <div className="border-b pb-1 text-2xl font-semibold tracking-tight">
        {title}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default DashboardSection;
