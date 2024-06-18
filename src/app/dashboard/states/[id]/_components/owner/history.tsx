import Scenarist, {
  ScenaristLoading,
} from "@/app/dashboard/_components/scenarist";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/server";
import { type RouterOutputs } from "@/trpc/shared";
import { History } from "lucide-react";
import { DateTime } from "luxon";
import {
  Fragment,
  Suspense,
  type ComponentProps,
  type FC,
  type HTMLAttributes,
} from "react";

const StateOwnersHistory: FC<
  ComponentProps<typeof Sheet> & { stateOwnerHistory: { id: string } }
> = ({ stateOwnerHistory: { id } }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary" className="w-full">
          <History className="mr-2 h-4 w-4" /> История передачи сценария
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center">
            <History className="mr-2 h-6 w-6" /> История передачи сценария
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 py-4">
          <Suspense fallback={<StateOwnersHistoryContentLoading />}>
            <StateOwnersHistoryContent id={id} />
          </Suspense>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const StateOwnersHistoryContent: FC<{ id: string }> = async ({ id }) => {
  const ownersHistory = await api.states.readOwnersHistory({ id });
  return (
    <Fragment>
      {ownersHistory.map((item) => (
        <StateOwnersHistoryContentItem
          key={(item.stateId, item.ownerId)}
          stateOwnersHistoryContentItem={item}
        />
      ))}
    </Fragment>
  );
};

const StateOwnersHistoryContentLoading: FC = () => (
  <Fragment>
    {[...Array(3).keys()].map((key) => (
      <StateOwnersHistoryContentItemLoading key={key} />
    ))}
  </Fragment>
);

const StateOwnersHistoryContentItem: FC<
  HTMLAttributes<HTMLDivElement> & {
    stateOwnersHistoryContentItem: RouterOutputs["states"]["readOwnersHistory"][number];
  }
> = ({
  stateOwnersHistoryContentItem: { ownerId, timestamp },
  className,
  ...props
}) => {
  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      <p className="text-sm text-muted-foreground">
        {DateTime.fromJSDate(timestamp).toLocaleString()}
      </p>
      <Scenarist scenarist={{ id: ownerId }} />
    </div>
  );
};

const StateOwnersHistoryContentItemLoading: FC<
  HTMLAttributes<HTMLDivElement>
> = ({ className, ...props }) => (
  <div className={cn("flex flex-col gap-2", className)} {...props}>
    <Skeleton className="inline-block text-sm">{" ".repeat(20)}</Skeleton>
    <ScenaristLoading />
  </div>
);

export default StateOwnersHistory;
