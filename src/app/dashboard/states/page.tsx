import { type FC } from "react";
import DashboardPageLayout from "../_components/page-layout";
import StatesView from "./_components/view";

const StatesPage: FC = async () => {
  return (
    <DashboardPageLayout section={{ header: { title: "Стейты" } }}>
      <StatesView />
    </DashboardPageLayout>
  );
};

export default StatesPage;
