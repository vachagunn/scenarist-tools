import {
  ListBaseItemUIIcon,
  ListBaseItemUILoading,
} from "@/app/dashboard/_components/list/items/base";
import ListEventItem from "@/app/dashboard/_components/list/items/event";
import EventsIcon from "@/app/dashboard/events/_components/icon";
import { api } from "@/trpc/server";
import { type RouterOutputs } from "@/trpc/shared";
import { Suspense, type ComponentProps, type FC } from "react";
import ActivatorsListBaseItemUI, { GlobalIndicator } from "./base";

type StateActivatorEvent =
  RouterOutputs["states"]["readActivators"]["events"][number];

export const ActivatorsListEventItem: FC<{
  activatorsListEventItem: StateActivatorEvent;
}> = ({ activatorsListEventItem: { eventId, isGlobal } }) => {
  return (
    <Suspense fallback={<ListBaseItemUILoading />}>
      <ActivatorsListEventItemContent
        activatorsListEventItemContent={{ eventId, isGlobal }}
      />
    </Suspense>
  );
};

export const ActivatorsListEventItemContent: FC<
  Omit<
    ComponentProps<typeof ActivatorsListEventItemUI>,
    "activatorsListEventItemUI"
  > & {
    activatorsListEventItemContent: StateActivatorEvent;
  }
> = async ({ activatorsListEventItemContent: { eventId, isGlobal } }) => {
  const event = await api.events.read({ id: eventId });
  return (
    <ActivatorsListEventItemUI
      activatorsListEventItemUI={{ eventId, isGlobal, event }}
    />
  );
};

export const ActivatorsListEventItemUI: FC<
  Omit<
    ComponentProps<typeof ActivatorsListBaseItemUI>,
    "activatorsListBaseItemUI"
  > & {
    activatorsListEventItemUI: StateActivatorEvent & {
      event: RouterOutputs["events"]["read"];
    };
  }
> = ({
  activatorsListEventItemUI: {
    isGlobal,
    event: { id, title },
  },
  ...props
}) => (
  <ActivatorsListBaseItemUI
    activatorsListBaseItemUI={{
      targetActivator: <ListEventItem listEventItem={{ id }} />,
    }}
    {...props}
  >
    <ListBaseItemUIIcon>
      <EventsIcon />
    </ListBaseItemUIIcon>
    {isGlobal && (
      <ListBaseItemUIIcon>
        <GlobalIndicator />
      </ListBaseItemUIIcon>
    )}
    {title}
  </ActivatorsListBaseItemUI>
);
