import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Suspense, type FC, type HTMLAttributes } from "react";

const DashboardSubsection: FC<
  HTMLAttributes<HTMLDivElement> & { dashboardSubsection: { title: string } }
> = ({ dashboardSubsection: { title }, className, children, ...props }) => {
  return (
    <div className={cn("flex flex-col gap-1", className)} {...props}>
      <div className="text-lg font-medium tracking-tight">{title}</div>
      <div>
        <Suspense fallback={<DashboardSubsectionLoading />}>
          {children}
        </Suspense>
      </div>
    </div>
  );
};

const DashboardSubsectionLoading: FC = () => (
  <Skeleton className="h-40 w-full" />
);

export default DashboardSubsection;
