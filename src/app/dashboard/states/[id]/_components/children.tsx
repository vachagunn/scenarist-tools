import List from "@/app/dashboard/_components/list";
import DashboardSection from "@/app/dashboard/_components/section";
import { api } from "@/trpc/server";
import { type ComponentProps, type FC } from "react";
import ListStateItem from "../../_components/list/item";

const StateChildren: FC<
  Omit<ComponentProps<typeof DashboardSection>, "dashboardSection"> & {
    stateChildren: { id: string };
  }
> = ({ stateChildren: { id }, ...props }) => {
  return (
    <DashboardSection
      dashboardSection={{ title: "Дочерние стейты" }}
      {...props}
    >
      <List>
        <StateChildrenContent stateChildrenContent={{ id }} />
      </List>
    </DashboardSection>
  );
};

const StateChildrenContent: FC<{
  stateChildrenContent: { id: string };
}> = async ({ stateChildrenContent: { id } }) => {
  const children = await api.states.readChildren({ id });
  return (
    <>
      {children.map(({ id }) => (
        <ListStateItem key={id} listStateItem={{ id }} />
      ))}
    </>
  );
};

export default StateChildren;
