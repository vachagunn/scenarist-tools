import ListBaseItemUI, {
  ListBaseItemUIIcon,
} from "@/app/dashboard/_components/list/items/base";
import { type RouterOutputs } from "@/trpc/shared";
import Link from "next/link";
import { type ComponentProps, type FC } from "react";
import ProjectsIcon from "../../icon";

export const ListProjectItemUI: FC<
  ComponentProps<typeof ListBaseItemUI> & {
    listProjectItemUI: RouterOutputs["projects"]["read"];
  }
> = ({ listProjectItemUI: { id, title }, ...props }) => (
  <Link href={`/dashboard/projects/${id}`}>
    <ListBaseItemUI {...props}>
      <ListBaseItemUIIcon>
        <ProjectsIcon />
      </ListBaseItemUIIcon>
      {title}
    </ListBaseItemUI>
  </Link>
);
