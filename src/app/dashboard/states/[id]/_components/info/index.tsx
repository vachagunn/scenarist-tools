import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/server";
import { Suspense, type FC, type HTMLAttributes } from "react";
import StateInfoName from "./name";
import StateInfoTheme from "./theme";

const StateInfo: FC<
  HTMLAttributes<HTMLDivElement> & { stateInfo: { id: string } }
> = ({ stateInfo: { id }, className, ...props }) => {
  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      <Suspense fallback={<StateInfoContentLoading />}>
        <StateInfoContent stateInfoContent={{ id }} />
      </Suspense>
    </div>
  );
};

const StateInfoContent: FC<{ stateInfoContent: { id: string } }> = async ({
  stateInfoContent: { id },
}) => {
  const state = await api.states.read({ id });
  return (
    <>
      <StateInfoName stateInfoName={state} />
      <StateInfoTheme stateInfoTheme={state} />
    </>
  );
};

const StateInfoContentLoading: FC = () => <Skeleton className="h-80 w-full" />;

export default StateInfo;
