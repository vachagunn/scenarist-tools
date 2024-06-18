"use client";

import {
  NestedList,
  NestedListContent,
  NestedListItem,
  NestedListTrigger,
} from "@/app/dashboard/_components/list/nested";
import { ListProjectItemUI } from "@/app/dashboard/projects/_components/list/item/ui";
import { ListThemeItemUI } from "@/app/dashboard/themes/_components/list/item/ui";
import { api } from "@/trpc/react";
import { type RouterOutputs } from "@/trpc/shared";
import { useAtom } from "jotai";
import { Suspense, type FC } from "react";
import { useDebounceValue } from "usehooks-ts";
import { ListStateItemUI } from "../list/item/ui";
import { statesViewSearchAtom } from "./search";

const StatesViewList: FC = () => {
  return (
    <Suspense fallback={"loading"}>
      <StatesViewListContent />
    </Suspense>
  );
};

type StatesListOutput = RouterOutputs["states"]["list"];
type StatesListOutputItem = StatesListOutput["items"][number];

const StatesViewListContent: FC = () => {
  const [search] = useAtom(statesViewSearchAtom);
  const [searchDebounced] = useDebounceValue(search, 500);

  const [{ pages }, {}] = api.states.list.useSuspenseInfiniteQuery(
    { search: searchDebounced || undefined },
    { getNextPageParam: ({ nextCursor }) => nextCursor },
  );

  const states = pages.flatMap(({ items }) => items);

  const statesByTheme = states.reduce(
    (acc, v) => {
      const forTheme = acc.get(v.themeId);
      if (forTheme) {
        forTheme.states.push(v);
      } else {
        acc.set(v.themeId, { theme: v.theme, states: [v] });
      }
      return acc;
    },
    new Map<
      string,
      {
        theme: StatesListOutputItem["theme"];
        states: StatesListOutputItem[];
      }
    >(),
  );

  const statesByThemeByProject = [...statesByTheme].reduce(
    (acc, [themeId, forTheme]) => {
      const forProject = acc.get(forTheme.theme.projectId);
      if (forProject) {
        forProject.themes.set(themeId, forTheme);
      } else {
        acc.set(forTheme.theme.projectId, {
          project: forTheme.theme.project,
          themes: new Map([[themeId, forTheme]]),
        });
      }
      return acc;
    },
    new Map<
      string,
      {
        project: StatesListOutputItem["theme"]["project"];
        themes: typeof statesByTheme;
      }
    >(),
  );

  return (
    <NestedList type="multiple">
      {[...statesByThemeByProject].map(([key, { project, themes }]) => (
        <NestedListItem key={key} value={key}>
          <NestedListTrigger>
            <div className="grow">
              <ListProjectItemUI listProjectItemUI={project} />
            </div>
          </NestedListTrigger>
          <NestedListContent>
            <NestedList type="multiple">
              {[...themes].map(([key, { theme, states }]) => (
                <NestedListItem key={key} value={key}>
                  <NestedListTrigger>
                    <div className="grow">
                      <ListThemeItemUI listThemeItemUI={theme} />
                    </div>
                  </NestedListTrigger>
                  <NestedListContent>
                    {states.map((state) => (
                      <div key={state.id} className="ml-6">
                        <ListStateItemUI listStateItemUI={state} />
                      </div>
                    ))}
                  </NestedListContent>
                </NestedListItem>
              ))}
            </NestedList>
          </NestedListContent>
        </NestedListItem>
      ))}
    </NestedList>
  );
};

export default StatesViewList;
