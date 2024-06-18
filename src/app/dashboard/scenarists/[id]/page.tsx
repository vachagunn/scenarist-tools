import { type FC } from "react";
import DashboardPageLayout from "../../_components/page-layout";
import ScenaristPath from "./_components/path";
import ScenaristStatesOwned from "./_components/states-owned";
import ScenaristTitle from "./_components/title";

const ScenaristPage: FC<{ params: { id: string } }> = ({ params: { id } }) => {
  return (
    <DashboardPageLayout
      section={{
        header: {
          title: <ScenaristTitle scenaristTitle={{ id }} />,
          upper: <ScenaristPath />,
        },
      }}
    >
      <ScenaristStatesOwned scenaristStatesOwned={{ id }} />
    </DashboardPageLayout>
  );
};

export default ScenaristPage;
