import EventsIcon from "@/app/dashboard/events/_components/icon";
import { api } from "@/trpc/server";
import { type RouterOutputs } from "@/trpc/shared";
import { Suspense, type ComponentProps, type FC } from "react";
import { ListBaseItemUILoading } from "../../../base";
import ListEventItem from "../../../event";
import { ListLinkedActivatorActivatesItemContentUI } from "../base";
import ListLinkedActivatorBaseItemUI from "./base";

type ActivatorEvent =
  RouterOutputs["states"]["readActivators"]["events"][number];

export const ActivatorsListEventItem: FC<{
  activatorsListEventItem: ActivatorEvent;
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
    activatorsListEventItemContent: ActivatorEvent;
  }
> = async ({ activatorsListEventItemContent: { eventId, isGlobal } }) => {
  const target = await api.events.read({ id: eventId });
  return (
    <ActivatorsListEventItemUI
      activatorsListEventItemUI={{ eventId, isGlobal, target }}
    />
  );
};

export const ActivatorsListEventItemUI: FC<
  Omit<
    ComponentProps<typeof ListLinkedActivatorBaseItemUI>,
    "listLinkedActivatorBaseItemUI"
  > & {
    activatorsListEventItemUI: ActivatorEvent & {
      target: RouterOutputs["events"]["read"];
    };
  }
> = ({ activatorsListEventItemUI, ...props }) => (
  <ListLinkedActivatorBaseItemUI
    listLinkedActivatorBaseItemUI={{
      target: (
        <ListEventItem
          listEventItem={{ id: activatorsListEventItemUI.target.id }}
        />
      ),
    }}
    {...props}
  >
    <ListLinkedActivatorActivatesItemContentUI
      listLinkedActivatorActivatesItemContentUI={{
        Icon: EventsIcon,
        link: activatorsListEventItemUI,
      }}
    />
  </ListLinkedActivatorBaseItemUI>
);
