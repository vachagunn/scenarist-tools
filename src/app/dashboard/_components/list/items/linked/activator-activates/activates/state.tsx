import StatesIcon from "@/app/dashboard/states/_components/icon";
import { type eventsToStates, type intentsToStates } from "@/server/db/schema";
import { api } from "@/trpc/server";
import { type RouterOutputs } from "@/trpc/shared";
import { Suspense, type ComponentProps, type FC } from "react";
import { ListBaseItemUILoading } from "../../../base";
import ListStateItem from "../../../state";
import { ListLinkedActivatorActivatesItemContentUI } from "../base";
import ListLinkedActivatesBaseItemUI from "./base";

type ActivatesState =
  | Omit<typeof intentsToStates.$inferSelect, "intentId">
  | Omit<typeof eventsToStates.$inferSelect, "eventId">;

export const ActivatesListStateItem: FC<{
  activatesListStateItem: ActivatesState;
}> = ({ activatesListStateItem: { stateId, isGlobal } }) => {
  return (
    <Suspense fallback={<ListBaseItemUILoading />}>
      <ActivatesListStateItemContent
        activatesListStateItemContent={{ stateId, isGlobal }}
      />
    </Suspense>
  );
};

export const ActivatesListStateItemContent: FC<
  Omit<
    ComponentProps<typeof ActivatesListStateItemUI>,
    "activatesListStateItemUI"
  > & {
    activatesListStateItemContent: ActivatesState;
  }
> = async ({ activatesListStateItemContent: { stateId, isGlobal } }) => {
  const target = await api.states.read({ id: stateId });
  return (
    <ActivatesListStateItemUI
      activatesListStateItemUI={{ stateId, isGlobal, target }}
    />
  );
};

export const ActivatesListStateItemUI: FC<
  Omit<
    ComponentProps<typeof ListLinkedActivatesBaseItemUI>,
    "listLinkedActivatesBaseItemUI"
  > & {
    activatesListStateItemUI: ActivatesState & {
      target: RouterOutputs["states"]["read"];
    };
  }
> = ({ activatesListStateItemUI, ...props }) => (
  <ListLinkedActivatesBaseItemUI
    listLinkedActivatesBaseItemUI={{
      target: (
        <ListStateItem
          listStateItem={{ id: activatesListStateItemUI.target.id }}
        />
      ),
    }}
    {...props}
  >
    <ListLinkedActivatorActivatesItemContentUI
      listLinkedActivatorActivatesItemContentUI={{
        Icon: StatesIcon,
        link: activatesListStateItemUI,
      }}
    />
  </ListLinkedActivatesBaseItemUI>
);
