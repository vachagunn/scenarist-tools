import List from "@/app/dashboard/_components/list";
import ListStateItem from "@/app/dashboard/_components/list/items/state";
import DashboardSection from "@/app/dashboard/_components/section";
import { api } from "@/trpc/server";
import { type ComponentProps, type FC } from "react";

const ThemeStatesList: FC<
  Omit<ComponentProps<typeof DashboardSection>, "dashboardSection"> & {
    themeStatesList: { id: string };
  }
> = ({ themeStatesList: { id }, ...props }) => {
  return (
    <DashboardSection dashboardSection={{ title: "Стейты" }} {...props}>
      <List>
        <ThemeStatesListContent themeStatesListContent={{ id }} />
      </List>
    </DashboardSection>
  );
};

const ThemeStatesListContent: FC<{
  themeStatesListContent: { id: string };
}> = async ({ themeStatesListContent: { id } }) => {
  const states = await api.themes.readStates({ id });
  return (
    <>
      {states.map((id) => (
        <ListStateItem key={id} listStateItem={{ id }} />
      ))}
    </>
  );
};

export default ThemeStatesList;
