import { ListBaseItemUILoading } from "@/app/dashboard/_components/list/items/base";
import { api } from "@/trpc/server";
import { Suspense, type ComponentProps, type FC } from "react";
import { ListStateItemUI } from "./ui";

const ListStateItem: FC<{ listStateItem: { id: string } }> = ({
  listStateItem: { id },
}) => {
  return (
    <Suspense fallback={<ListBaseItemUILoading />}>
      <ListStateItemContent listStateItemContent={{ id }} />
    </Suspense>
  );
};

const ListStateItemContent: FC<
  Omit<ComponentProps<typeof ListStateItemUI>, "listStateItemUI"> & {
    listStateItemContent: { id: string };
  }
> = async ({ listStateItemContent: { id }, ...props }) => {
  const state = await api.states.read({ id });
  return <ListStateItemUI listStateItemUI={state} {...props} />;
};

export default ListStateItem;
export * from "./ui";
