import DashboardSubsection from "@/app/dashboard/_components/subsection";
import { type RouterOutputs } from "@/trpc/shared";
import { type FC } from "react";
import IntentInfoNameClient from "./client";

const IntentInfoName: FC<{
  intentInfoName: RouterOutputs["intents"]["read"];
}> = ({ intentInfoName }) => (
  <DashboardSubsection dashboardSubsection={{ title: "Название" }}>
    <IntentInfoNameClient intentInfoNameClient={intentInfoName} />
  </DashboardSubsection>
);

export default IntentInfoName;
