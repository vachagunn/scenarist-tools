import List from "@/app/dashboard/_components/list";
import { api } from "@/trpc/server";
import { type ComponentProps, type FC } from "react";
import { ActivatorsListEventItem } from "./items/event";
import { ActivatorsListIntentItem } from "./items/intent";

const StateActivatorsList: FC<
  ComponentProps<typeof List> & { stateActivatorsList: { id: string } }
> = ({ stateActivatorsList: { id }, ...props }) => {
  return (
    <List {...props}>
      <StateActivatorsListContent stateActivatorsListContent={{ id }} />
    </List>
  );
};

const StateActivatorsListContent: FC<{
  stateActivatorsListContent: { id: string };
}> = async ({ stateActivatorsListContent: { id } }) => {
  const { intents, events } = await api.states.readActivators({ id });
  return (
    <>
      {intents.map((item) => (
        <ActivatorsListIntentItem
          key={item.intentId}
          activatorsListIntentItem={item}
        />
      ))}
      {events.map((item) => (
        <ActivatorsListEventItem
          key={item.eventId}
          activatorsListEventItem={item}
        />
      ))}
    </>
  );
};

export default StateActivatorsList;
