import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/server";
import { Suspense, type FC, type HTMLAttributes } from "react";
import ThemesIcon from "../../_components/icon";

const IntentTitle: FC<
  HTMLAttributes<HTMLDivElement> & { intentTitle: { id: string } }
> = ({ intentTitle: { id }, className, ...props }) => {
  return (
    <div className={cn("flex items-center", className)} {...props}>
      <ThemesIcon className="mr-2 rounded-sm bg-muted p-1 text-muted-foreground" />
      <Suspense fallback={<IntentTitleContentLoading />}>
        <IntentTitleContent intentTitleContent={{ id }} />
      </Suspense>
    </div>
  );
};

const IntentTitleContent: FC<{ intentTitleContent: { id: string } }> = async ({
  intentTitleContent: { id },
}) => {
  const { title } = await api.intents.read({ id });
  return title;
};

const IntentTitleContentLoading: FC = () => (
  <Skeleton className="inline-block whitespace-pre">{" ".repeat(50)}</Skeleton>
);

export default IntentTitle;
