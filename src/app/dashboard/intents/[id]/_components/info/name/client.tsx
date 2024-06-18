"use client";

import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { type RouterOutputs } from "@/trpc/shared";
import { useState, type FC } from "react";

const IntentInfoNameClient: FC<{
  intentInfoNameClient: RouterOutputs["intents"]["read"];
}> = ({ intentInfoNameClient: { id, name } }) => {
  const { mutate } = api.intents.setName.useMutation();
  const [intentName, setIntentName] = useState(name);

  function onSubmit() {
    mutate({ id, name: intentName });
  }

  return (
    <Input
      type="text"
      name="name"
      className="max-w-xs"
      placeholder="Введите название интента"
      value={intentName}
      onChange={(e) => setIntentName(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") onSubmit();
      }}
      onBlur={onSubmit}
    />
  );
};

export default IntentInfoNameClient;
