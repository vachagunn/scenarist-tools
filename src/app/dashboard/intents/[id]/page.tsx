import DashboardPageLayout from "@/app/dashboard/_components/page-layout";
import { type FC } from "react";

import IntentActivatesList from "./_components/activates-list";
import IntentChildren from "./_components/children";
import IntentInfo from "./_components/info";
import IntentPath from "./_components/path";
import IntentTitle from "./_components/title";

const IntentPage: FC<{ params: { id: string } }> = async ({
  params: { id },
}) => {
  return (
    <DashboardPageLayout
      section={{
        header: {
          upper: <IntentPath />,
          title: <IntentTitle intentTitle={{ id }} />,
        },
      }}
    >
      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-6">
          <IntentInfo intentInfo={{ id }} />
          <IntentActivatesList intentActivatesList={{ id }} />
          <IntentChildren intentChildren={{ id }} />
        </div>
        <div className="flex flex-col gap-4"></div>
      </div>
      <div className="flex flex-col gap-6"></div>
    </DashboardPageLayout>
  );
};

export default IntentPage;
