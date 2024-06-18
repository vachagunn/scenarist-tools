import ListBaseItemUI, {
  ListBaseItemUIIcon,
} from "@/app/dashboard/_components/list/items/base";
import IntentsIcon from "@/app/dashboard/intents/_components/icon";
import { type RouterOutputs } from "@/trpc/shared";
import Link from "next/link";
import { type ComponentProps, type FC } from "react";

export const ListIntentItemUI: FC<
  ComponentProps<typeof ListBaseItemUI> & {
    listIntentItemUI: RouterOutputs["intents"]["read"];
  }
> = ({ listIntentItemUI: { id, title }, ...props }) => (
  <Link href={`/dashboard/intents/${id}`}>
    <ListBaseItemUI {...props}>
      <ListBaseItemUIIcon>
        <IntentsIcon />
      </ListBaseItemUIIcon>
      {title}
    </ListBaseItemUI>
  </Link>
);
