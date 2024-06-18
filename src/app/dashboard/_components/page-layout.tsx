import { cn } from "@/lib/utils";
import { type FC, type HTMLAttributes, type ReactNode } from "react";

const DashboardPageLayout: FC<
  HTMLAttributes<HTMLDivElement> & {
    section: {
      header: { title: ReactNode; upper?: ReactNode };
    };
  }
> = ({
  section: {
    header: { title, upper },
  },
  className,
  children,
  ...props
}) => {
  return (
    <div className={cn("flex flex-col gap-8", className)} {...props}>
      <div className="flex flex-col gap-2">
        {upper}
        <div className="w-fit border-b pb-2 text-3xl font-semibold">
          {title}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default DashboardPageLayout;
