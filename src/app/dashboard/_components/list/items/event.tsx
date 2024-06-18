import EventsIcon from "@/app/dashboard/events/_components/icon";
import { api } from "@/trpc/server";
import { type RouterOutputs } from "@/trpc/shared";
import Link from "next/link";
import { Suspense, type ComponentProps, type FC } from "react";
import ListBaseItemUI, {
  ListBaseItemUIIcon,
  ListBaseItemUILoading,
} from "./base";

const ListEventItem: FC<{ listEventItem: { id: string } }> = ({
  listEventItem: { id },
}) => {
  return (
    <Suspense fallback={<ListBaseItemUILoading />}>
      <ListIntentEventContent listIntentEventContent={{ id }} />
    </Suspense>
  );
};

const ListIntentEventContent: FC<
  Omit<ComponentProps<typeof ListIntentEventUI>, "listEventItemUI"> & {
    listIntentEventContent: { id: string };
  }
> = async ({ listIntentEventContent: { id }, ...props }) => {
  const event = await api.events.read({ id });
  return <ListIntentEventUI listEventItemUI={event} {...props} />;
};

export const ListIntentEventUI: FC<
  ComponentProps<typeof ListBaseItemUI> & {
    listEventItemUI: RouterOutputs["events"]["read"];
  }
> = ({ listEventItemUI: { id, title }, ...props }) => (
  <Link href={`/dashboard/events/${id}`}>
    <ListBaseItemUI {...props}>
      <ListBaseItemUIIcon>
        <EventsIcon />
      </ListBaseItemUIIcon>
      {title}
    </ListBaseItemUI>
  </Link>
);

export default ListEventItem;
