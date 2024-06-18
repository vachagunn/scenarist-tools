import List from "@/app/dashboard/_components/list";
import DashboardSection from "@/app/dashboard/_components/section";
import { api } from "@/trpc/server";
import { type ComponentProps, type FC } from "react";
import { ListIntentItem } from "../../_components/list";

const IntentChildren: FC<
  Omit<ComponentProps<typeof DashboardSection>, "dashboardSection"> & {
    intentChildren: { id: string };
  }
> = ({ intentChildren: { id }, ...props }) => {
  return (
    <DashboardSection
      dashboardSection={{ title: "Дочерние интенты" }}
      {...props}
    >
      <List>
        <IntentChildrenContent intentChildrenContent={{ id }} />
      </List>
    </DashboardSection>
  );
};

const IntentChildrenContent: FC<{
  intentChildrenContent: { id: string };
}> = async ({ intentChildrenContent: { id } }) => {
  const children = await api.intents.readChildren({ id });
  return (
    <>
      {children.map(({ id }) => (
        <ListIntentItem key={id} listIntentItem={{ id }} />
      ))}
    </>
  );
};

export default IntentChildren;
