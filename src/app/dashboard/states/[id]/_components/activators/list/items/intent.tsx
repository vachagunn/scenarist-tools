import {
  ListBaseItemUIIcon,
  ListBaseItemUILoading,
} from "@/app/dashboard/_components/list/items/base";
import ListIntentItem from "@/app/dashboard/_components/list/items/intent";
import IntentsIcon from "@/app/dashboard/intents/_components/icon";
import { api } from "@/trpc/server";
import { type RouterOutputs } from "@/trpc/shared";
import { Suspense, type ComponentProps, type FC } from "react";
import ActivatorsListBaseItemUI, { GlobalIndicator } from "./base";

type StateActivatorIntent =
  RouterOutputs["states"]["readActivators"]["intents"][number];

export const ActivatorsListIntentItem: FC<{
  activatorsListIntentItem: StateActivatorIntent;
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
    activatorsListIntentItemContent: StateActivatorIntent;
  }
> = async ({ activatorsListIntentItemContent: { intentId, isGlobal } }) => {
  const intent = await api.intents.read({ id: intentId });
  return (
    <ActivatorsListIntentItemUI
      activatorsListIntentItemUI={{ intentId, isGlobal, intent }}
    />
  );
};

export const ActivatorsListIntentItemUI: FC<
  Omit<
    ComponentProps<typeof ActivatorsListBaseItemUI>,
    "activatorsListBaseItemUI"
  > & {
    activatorsListIntentItemUI: StateActivatorIntent & {
      intent: RouterOutputs["intents"]["read"];
    };
  }
> = ({
  activatorsListIntentItemUI: {
    isGlobal,
    intent: { id, title },
  },
  ...props
}) => (
  <ActivatorsListBaseItemUI
    activatorsListBaseItemUI={{
      targetActivator: <ListIntentItem listIntentItem={{ id }} />,
    }}
    {...props}
  >
    <ListBaseItemUIIcon>
      <IntentsIcon />
    </ListBaseItemUIIcon>
    {isGlobal && (
      <ListBaseItemUIIcon>
        <GlobalIndicator />
      </ListBaseItemUIIcon>
    )}
    {title}
  </ActivatorsListBaseItemUI>
);
