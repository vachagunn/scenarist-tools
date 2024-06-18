import { type FC } from "react";
import DashboardPageLayout from "../_components/page-layout";
import ThemesList from "./_components/list";

const ThemesPage: FC = () => {
  return (
    <DashboardPageLayout section={{ header: { title: "Темы" } }}>
      <ThemesList />
    </DashboardPageLayout>
  );
};

export default ThemesPage;
