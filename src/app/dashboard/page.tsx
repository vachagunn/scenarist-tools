import { Suspense, type FC } from "react";
import DashboardPageLayout from "./_components/page-layout";
import DashboardUserName, {
  DashboardUserNameLoading,
} from "./_components/user-name";

const DashboardPage: FC = async () => {
  return (
    <DashboardPageLayout
      section={{
        header: {
          title: (
            <span className="whitespace-pre">
              Привет,{" "}
              <Suspense fallback={<DashboardUserNameLoading />}>
                <DashboardUserName />
              </Suspense>
              !
            </span>
          ),
        },
      }}
    ></DashboardPageLayout>
  );
};

export default DashboardPage;
