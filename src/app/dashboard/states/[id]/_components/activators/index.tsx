import DashboardSection from "@/app/dashboard/_components/section";
import { type ComponentProps, type FC } from "react";
import StateActivatorsList from "./list";

const StateActivators: FC<
  Omit<ComponentProps<typeof DashboardSection>, "dashboardSection"> & {
    stateActivators: { id: string };
  }
> = ({ stateActivators: { id }, ...props }) => {
  return (
    <DashboardSection dashboardSection={{ title: "Активаторы" }} {...props}>
      <StateActivatorsList stateActivatorsList={{ id }} />
    </DashboardSection>
  );
};

export default StateActivators;
