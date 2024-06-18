import List from "@/app/dashboard/_components/list";
import { ActivatesListStateItem } from "@/app/dashboard/_components/list/items/linked/activator-activates/activates/state";
import DashboardSection from "@/app/dashboard/_components/section";
import { api } from "@/trpc/server";
import { type ComponentProps, type FC } from "react";

const IntentActivatesList: FC<
  Omit<ComponentProps<typeof DashboardSection>, "dashboardSection"> & {
    intentActivatesList: { id: string };
  }
> = ({ intentActivatesList: { id }, ...props }) => {
  return (
    <DashboardSection dashboardSection={{ title: "Стейты" }} {...props}>
      <List>
        <IntentActivatesListContent intentActivatesListContent={{ id }} />
      </List>
    </DashboardSection>
  );
};

const IntentActivatesListContent: FC<{
  intentActivatesListContent: { id: string };
}> = async ({ intentActivatesListContent: { id } }) => {
  const activates = await api.intents.readActivates({ id });
  return (
    <>
      {activates.map((item) => (
        <ActivatesListStateItem
          key={item.stateId}
          activatesListStateItem={item}
        />
      ))}
    </>
  );
};

export default IntentActivatesList;
