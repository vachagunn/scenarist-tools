import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { type FC, type HTMLAttributes } from "react";

const ListBaseItemUI: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={cn(
      "flex cursor-pointer select-none items-center gap-x-2 rounded-sm px-2 py-1.5 hover:bg-secondary focus:bg-accent focus:text-accent-foreground",
      className,
    )}
    {...props}
  />
);

export const ListBaseItemUILoading: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div className={cn("select-none px-2 py-1.5", className)} {...props}>
      <Skeleton className="inline-block whitespace-pre">
        {" ".repeat(50)}
      </Skeleton>
    </div>
  );
};

export const ListBaseItemUIIcon: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={cn(
      "h-6 w-6 rounded-sm bg-muted p-1 text-muted-foreground [&>*]:h-full [&>*]:w-full",
      className,
    )}
    {...props}
  />
);

export default ListBaseItemUI;
