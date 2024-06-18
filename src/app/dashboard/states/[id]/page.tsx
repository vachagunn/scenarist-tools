import DashboardPageLayout from "@/app/dashboard/_components/page-layout";
import { type FC } from "react";
import StateActivators from "./_components/activators";
import StateChildren from "./_components/children";
import StateInfo from "./_components/info";
import StateOwner from "./_components/owner";
import StatePath from "./_components/path";
import StateTitle from "./_components/title";

const StatePage: FC<{ params: { id: string } }> = ({ params: { id } }) => {
  return (
    <DashboardPageLayout
      section={{
        header: {
          upper: <StatePath statePath={{ id }} />,
          title: <StateTitle stateTitle={{ id }} />,
        },
      }}
    >
      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-6">
          <StateInfo stateInfo={{ id }} />
          <StateActivators stateActivators={{ id }} />
          <StateChildren stateChildren={{ id }} />
        </div>
        <div className="flex flex-col gap-4">
          <StateOwner stateOwner={{ id }} />
        </div>
      </div>
    </DashboardPageLayout>
  );
};

export default StatePage;
