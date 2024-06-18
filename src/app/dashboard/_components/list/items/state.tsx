import StatesIcon from "@/app/dashboard/states/_components/icon";
import { api } from "@/trpc/server";
import { type RouterOutputs } from "@/trpc/shared";
import Link from "next/link";
import { Suspense, type ComponentProps, type FC } from "react";
import ListBaseItemUI, {
  ListBaseItemUIIcon,
  ListBaseItemUILoading,
} from "./base";

const ListStateItem: FC<{ listStateItem: { id: string } }> = ({
  listStateItem: { id },
}) => {
  return (
    <Suspense fallback={<ListBaseItemUILoading />}>
      <ListStateItemContent listStateItemContent={{ id }} />
    </Suspense>
  );
};

const ListStateItemContent: FC<
  Omit<ComponentProps<typeof ListStateItemUI>, "listStateItem"> & {
    listStateItemContent: { id: string };
  }
> = async ({ listStateItemContent: { id }, ...props }) => {
  const state = await api.states.read({ id });
  return <ListStateItemUI listStateItem={state} {...props} />;
};

export const ListStateItemUI: FC<
  ComponentProps<typeof ListBaseItemUI> & {
    listStateItem: RouterOutputs["states"]["read"];
  }
> = ({ listStateItem: { id, title }, ...props }) => (
  <Link href={`/dashboard/states/${id}`}>
    <ListBaseItemUI {...props}>
      <ListBaseItemUIIcon>
        <StatesIcon />
      </ListBaseItemUIIcon>
      {title}
    </ListBaseItemUI>
  </Link>
);

export default ListStateItem;
