import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/server";
import { Suspense, type FC, type HTMLAttributes } from "react";
import StatesIcon from "../../_components/icon";

const StateTitle: FC<
  HTMLAttributes<HTMLDivElement> & { stateTitle: { id: string } }
> = ({ stateTitle: { id }, className, ...props }) => (
  <div className={cn("flex items-center", className)} {...props}>
    <StatesIcon className="mr-2 rounded-sm bg-muted p-1 text-muted-foreground" />
    <Suspense fallback={<StateTitleContentLoading />}>
      <StateTitleContent stateTitleContent={{ id }} />
    </Suspense>
  </div>
);

const StateTitleContent: FC<{ stateTitleContent: { id: string } }> = async ({
  stateTitleContent: { id },
}) => {
  const { title } = await api.states.read({ id });
  return title;
};

const StateTitleContentLoading: FC = () => (
  <Skeleton className="inline-block whitespace-pre">{" ".repeat(50)}</Skeleton>
);

export default StateTitle;
