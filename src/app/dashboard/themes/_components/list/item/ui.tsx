import ListBaseItemUI, {
  ListBaseItemUIIcon,
} from "@/app/dashboard/_components/list/items/base";
import { type RouterOutputs } from "@/trpc/shared";
import Link from "next/link";
import { type ComponentProps, type FC } from "react";
import ThemesIcon from "../../icon";

export const ListThemeItemUI: FC<
  ComponentProps<typeof ListBaseItemUI> & {
    listThemeItemUI: RouterOutputs["themes"]["read"];
  }
> = ({ listThemeItemUI: { id, title }, ...props }) => (
  <Link href={`/dashboard/themes/${id}`}>
    <ListBaseItemUI {...props}>
      <ListBaseItemUIIcon>
        <ThemesIcon />
      </ListBaseItemUIIcon>
      {title}
    </ListBaseItemUI>
  </Link>
);
