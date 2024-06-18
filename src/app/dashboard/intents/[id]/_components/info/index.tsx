import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/server";
import { Suspense, type FC, type HTMLAttributes } from "react";
import IntentInfoName from "./name";

const IntentInfo: FC<
  HTMLAttributes<HTMLDivElement> & { intentInfo: { id: string } }
> = ({ intentInfo: { id }, className, ...props }) => {
  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      <Suspense fallback={<StateInfoContentLoading />}>
        <IntentInfoContent intentInfoContent={{ id }} />
      </Suspense>
    </div>
  );
};

const IntentInfoContent: FC<{ intentInfoContent: { id: string } }> = async ({
  intentInfoContent: { id },
}) => {
  const state = await api.intents.read({ id });
  return (
    <>
      <IntentInfoName intentInfoName={state} />
    </>
  );
};

const StateInfoContentLoading: FC = () => <Skeleton className="h-80 w-full" />;

export default IntentInfo;
