import ThemesIcon from "@/app/dashboard/themes/_components/icon";
import { api } from "@/trpc/server";
import { type RouterOutputs } from "@/trpc/shared";
import Link from "next/link";
import { Suspense, type ComponentProps, type FC } from "react";
import ListBaseItemUI, {
  ListBaseItemUIIcon,
  ListBaseItemUILoading,
} from "./base";

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
  Omit<ComponentProps<typeof ListThemeItemUI>, "listThemeItem"> & {
    listThemeItemContent: { id: string };
  }
> = async ({ listThemeItemContent: { id }, ...props }) => {
  const theme = await api.themes.read({ id });
  return <ListThemeItemUI listThemeItem={theme} {...props} />;
};

export const ListThemeItemUI: FC<
  ComponentProps<typeof ListBaseItemUI> & {
    listThemeItem: RouterOutputs["themes"]["read"];
  }
> = ({ listThemeItem: { id, title }, ...props }) => (
  <Link href={`/dashboard/themes/${id}`}>
    <ListBaseItemUI {...props}>
      <ListBaseItemUIIcon>
        <ThemesIcon />
      </ListBaseItemUIIcon>
      {title}
    </ListBaseItemUI>
  </Link>
);

export default ListThemeItem;
