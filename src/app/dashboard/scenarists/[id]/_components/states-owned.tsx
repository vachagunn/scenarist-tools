import List from "@/app/dashboard/_components/list";
import DashboardSection from "@/app/dashboard/_components/section";
import ListStateItem from "@/app/dashboard/states/_components/list/item";
import { api } from "@/trpc/server";
import { type ComponentProps, type FC } from "react";

const ScenaristStatesOwned: FC<
  Omit<ComponentProps<typeof DashboardSection>, "dashboardSection"> & {
    scenaristStatesOwned: { id: string };
  }
> = ({ scenaristStatesOwned: { id }, ...props }) => (
  <DashboardSection
    dashboardSection={{ title: "Стейты во владении" }}
    {...props}
  >
    <List>
      <ScenaristStatesOwnedContent scenaristStatesOwnedContent={{ id }} />
    </List>
  </DashboardSection>
);

const ScenaristStatesOwnedContent: FC<{
  scenaristStatesOwnedContent: { id: string };
}> = async ({ scenaristStatesOwnedContent: { id } }) => {
  const ownedStates = await api.scenarists.listOwnedStates({ id });
  return (
    <>
      {ownedStates.map(({ stateId }) => (
        <ListStateItem key={stateId} listStateItem={{ id: stateId }} />
      ))}
    </>
  );
};

export default ScenaristStatesOwned;
