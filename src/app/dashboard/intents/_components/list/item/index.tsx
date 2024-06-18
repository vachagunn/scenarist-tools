import { ListBaseItemUILoading } from "@/app/dashboard/_components/list/items/base";
import { api } from "@/trpc/server";
import { Suspense, type ComponentProps, type FC } from "react";
import { ListIntentItemUI } from "./ui";

export const ListIntentItem: FC<{ listIntentItem: { id: string } }> = ({
  listIntentItem: { id },
}) => {
  return (
    <Suspense fallback={<ListBaseItemUILoading />}>
      <ListIntentItemContent listIntentItemContent={{ id }} />
    </Suspense>
  );
};

const ListIntentItemContent: FC<
  Omit<ComponentProps<typeof ListIntentItemUI>, "listIntentItemUI"> & {
    listIntentItemContent: { id: string };
  }
> = async ({ listIntentItemContent: { id }, ...props }) => {
  const intent = await api.intents.read({ id });
  return <ListIntentItemUI listIntentItemUI={intent} {...props} />;
};

export * from "./";
