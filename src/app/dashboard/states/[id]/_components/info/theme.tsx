import ListThemeItem from "@/app/dashboard/_components/list/items/theme";
import DashboardSubsection from "@/app/dashboard/_components/subsection";
import { type RouterOutputs } from "@/trpc/shared";
import { type FC } from "react";

const StateInfoTheme: FC<{
  stateInfoTheme: RouterOutputs["states"]["read"];
}> = ({ stateInfoTheme: { themeId } }) => (
  <DashboardSubsection dashboardSubsection={{ title: "Тема" }}>
    <ListThemeItem listThemeItem={{ id: themeId }} />
  </DashboardSubsection>
);

export default StateInfoTheme;
