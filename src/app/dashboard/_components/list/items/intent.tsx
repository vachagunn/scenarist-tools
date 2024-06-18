import IntentsIcon from "@/app/dashboard/intents/_components/icon";
import { api } from "@/trpc/server";
import { type RouterOutputs } from "@/trpc/shared";
import Link from "next/link";
import { Suspense, type ComponentProps, type FC } from "react";
import ListBaseItemUI, {
  ListBaseItemUIIcon,
  ListBaseItemUILoading,
} from "./base";

const ListIntentItem: FC<{ listIntentItem: { id: string } }> = ({
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

export const ListIntentItemUI: FC<
  ComponentProps<typeof ListBaseItemUI> & {
    listIntentItemUI: RouterOutputs["intents"]["read"];
  }
> = ({ listIntentItemUI: { id, title }, ...props }) => (
  <Link href={`/dashboard/intents/${id}`}>
    <ListBaseItemUI {...props}>
      <ListBaseItemUIIcon>
        <IntentsIcon />
      </ListBaseItemUIIcon>
      {title}
    </ListBaseItemUI>
  </Link>
);

export default ListIntentItem;
