import Scenarist, {
  ScenaristLoading,
} from "@/app/dashboard/_components/scenarist";
import DashboardSection from "@/app/dashboard/_components/section";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/trpc/server";
import { AlertCircle } from "lucide-react";
import { Suspense, type ComponentProps, type FC } from "react";
import StateOwnersHistory from "./history";

const StateOwner: FC<
  Omit<ComponentProps<typeof DashboardSection>, "dashboardSection"> & {
    stateOwner: { id: string };
  }
> = ({ stateOwner: { id }, ...props }) => {
  return (
    <DashboardSection dashboardSection={{ title: "Владелец" }} {...props}>
      <div className="flex flex-col gap-4">
        <Suspense fallback={<StateOwnerContentLoading />}>
          <StateOwnerContent id={id} />
        </Suspense>
      </div>
    </DashboardSection>
  );
};

const StateOwnerContent: FC<{ id: string }> = async ({ id }) => {
  const owner = await api.states.readCurrentOwner({ id });
  if (!owner)
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Стейт без владельца</AlertTitle>
      </Alert>
    );
  return (
    <>
      <Scenarist scenarist={{ id: owner.ownerId }} />
      <StateOwnersHistory stateOwnerHistory={{ id }} />
    </>
  );
};

const StateOwnerContentLoading: FC = () => (
  <>
    <ScenaristLoading />
    <Skeleton className="h-10 px-4 py-2" />
  </>
);

export default StateOwner;
