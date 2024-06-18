import ListBaseItemUI, {
  ListBaseItemUIIcon,
} from "@/app/dashboard/_components/list/items/base";
import { type RouterOutputs } from "@/trpc/shared";
import Link from "next/link";
import { type ComponentProps, type FC } from "react";
import StatesIcon from "../../icon";

export const ListStateItemUI: FC<
  ComponentProps<typeof ListBaseItemUI> & {
    listStateItemUI: RouterOutputs["states"]["read"];
  }
> = ({ listStateItemUI: { id, title, name }, ...props }) => (
  <Link href={`/dashboard/states/${id}`}>
    <ListBaseItemUI {...props}>
      <ListBaseItemUIIcon>
        <StatesIcon />
      </ListBaseItemUIIcon>
      <div>{title}</div>
      <div className="hidden max-w-xs overflow-hidden text-ellipsis whitespace-nowrap rounded-md bg-muted px-1.5 py-0.5 text-xs text-muted-foreground sm:block">
        {name}
      </div>
    </ListBaseItemUI>
  </Link>
);
