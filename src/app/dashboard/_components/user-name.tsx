import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/trpc/server";
import { type FC } from "react";

const DashboardUserName: FC = async () => {
  const { fullName } = await api.users.me.read();
  return fullName;
};

export const DashboardUserNameLoading: FC = () => (
  <Skeleton className="inline-block">{" ".repeat(50)}</Skeleton>
);

export default DashboardUserName;
