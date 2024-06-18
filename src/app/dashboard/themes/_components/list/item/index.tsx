import { ListBaseItemUILoading } from "@/app/dashboard/_components/list/items/base";
import { api } from "@/trpc/server";
import { Suspense, type ComponentProps, type FC } from "react";
import { ListThemeItemUI } from "./ui";

const ListThemeItem: FC<{ listThemeItem: { id: string } }> = ({
  listThemeItem: { id },
}) => {
  return (
    <Suspense fallback={<ListBaseItemUILoading />}>
      <ListThemeItemContent listThemeItemContent={{ id }} />
    </Suspense>
  );
};

const ListThemeItemContent: FC<
  Omit<ComponentProps<typeof ListThemeItemUI>, "listThemeItemUI"> & {
    listThemeItemContent: { id: string };
  }
> = async ({ listThemeItemContent: { id }, ...props }) => {
  const theme = await api.themes.read({ id });
  return <ListThemeItemUI listThemeItemUI={theme} {...props} />;
};

export default ListThemeItem;
