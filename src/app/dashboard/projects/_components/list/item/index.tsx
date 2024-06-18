import { ListBaseItemUILoading } from "@/app/dashboard/_components/list/items/base";
import { api } from "@/trpc/server";
import { Suspense, type ComponentProps, type FC } from "react";
import { ListProjectItemUI } from "./ui";

const ListProjectItem: FC<{ listProjectItem: { id: string } }> = ({
  listProjectItem: { id },
}) => {
  return (
    <Suspense fallback={<ListBaseItemUILoading />}>
      <ListProjectItemContent listProjectItemContent={{ id }} />
    </Suspense>
  );
};

const ListProjectItemContent: FC<
  Omit<ComponentProps<typeof ListProjectItemUI>, "listProjectItemUI"> & {
    listProjectItemContent: { id: string };
  }
> = async ({ listProjectItemContent: { id }, ...props }) => {
  const state = await api.states.read({ id });
  return <ListProjectItemUI listProjectItemUI={state} {...props} />;
};

export default ListProjectItem;
