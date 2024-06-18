import DashboardPageLayout from "@/app/dashboard/_components/page-layout";
import { type FC } from "react";
import ThemeStatesList from "./_components/states-list";

import ThemePath from "./_components/path";
import ThemeTitle from "./_components/title";

const ThemePage: FC<{ params: { id: string } }> = async ({
  params: { id },
}) => {
  return (
    <DashboardPageLayout
      section={{
        header: {
          upper: <ThemePath />,
          title: <ThemeTitle themeTitle={{ id }} />,
        },
      }}
    >
      <ThemeStatesList themeStatesList={{ id }} />
    </DashboardPageLayout>
  );
};

export default ThemePage;
