import DashboardSubsection from "@/app/dashboard/_components/subsection";
import { type RouterOutputs } from "@/trpc/shared";
import { type FC } from "react";

const StateInfoName: FC<{
  stateInfoName: RouterOutputs["states"]["read"];
}> = ({ stateInfoName: { name } }) => (
  <DashboardSubsection dashboardSubsection={{ title: "Название" }}>
    <div>{name}</div>
  </DashboardSubsection>
);

export default StateInfoName;
