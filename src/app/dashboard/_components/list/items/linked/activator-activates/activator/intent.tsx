import ListIntentItem from "@/app/dashboard/_components/list/items/intent";
import IntentsIcon from "@/app/dashboard/intents/_components/icon";
import { api } from "@/trpc/server";
import { type RouterOutputs } from "@/trpc/shared";
import { Suspense, type ComponentProps, type FC } from "react";
import { ListBaseItemUILoading } from "../../../base";
import { ListLinkedActivatorActivatesItemContentUI } from "../base";
import ListLinkedActivatorBaseItemUI from "./base";

type ActivatorIntent =
  RouterOutputs["states"]["readActivators"]["intents"][number];

export const ActivatorsListIntentItem: FC<{
  activatorsListIntentItem: ActivatorIntent;
}> = ({ activatorsListIntentItem: { intentId, isGlobal } }) => {
  return (
    <Suspense fallback={<ListBaseItemUILoading />}>
      <ActivatorsListIntentItemContent
        activatorsListIntentItemContent={{ intentId, isGlobal }}
      />
    </Suspense>
  );
};

export const ActivatorsListIntentItemContent: FC<
  Omit<
    ComponentProps<typeof ActivatorsListIntentItemUI>,
    "activatorsListIntentItemUI"
  > & {
    activatorsListIntentItemContent: ActivatorIntent;
  }
> = async ({ activatorsListIntentItemContent: { intentId, isGlobal } }) => {
  const target = await api.intents.read({ id: intentId });
  return (
    <ActivatorsListIntentItemUI
      activatorsListIntentItemUI={{ intentId, isGlobal, target }}
    />
  );
};

export const ActivatorsListIntentItemUI: FC<
  Omit<
    ComponentProps<typeof ListLinkedActivatorBaseItemUI>,
    "listLinkedActivatorBaseItemUI"
  > & {
    activatorsListIntentItemUI: ActivatorIntent & {
      target: RouterOutputs["intents"]["read"];
    };
  }
> = ({ activatorsListIntentItemUI, ...props }) => (
  <ListLinkedActivatorBaseItemUI
    listLinkedActivatorBaseItemUI={{
      target: (
        <ListIntentItem
          listIntentItem={{ id: activatorsListIntentItemUI.target.id }}
        />
      ),
    }}
    {...props}
  >
    <ListLinkedActivatorActivatesItemContentUI
      listLinkedActivatorActivatesItemContentUI={{
        Icon: IntentsIcon,
        link: activatorsListIntentItemUI,
      }}
    />
  </ListLinkedActivatorBaseItemUI>
);
