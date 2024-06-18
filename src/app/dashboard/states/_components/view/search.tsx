"use client";

import { Input } from "@/components/ui/input";
import { atom, useAtom } from "jotai";
import { type ComponentProps, type FC } from "react";

export const statesViewSearchAtom = atom("");

const StatesViewSearch: FC<ComponentProps<typeof Input>> = (props) => {
  const [search, setSearch] = useAtom(statesViewSearchAtom);
  return (
    <Input
      placeholder="Поиск"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      {...props}
    />
  );
};

export default StatesViewSearch;
