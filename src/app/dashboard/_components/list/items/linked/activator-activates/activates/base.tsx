import { type ComponentProps, type FC, type ReactNode } from "react";
import ListLinkedActivatorActivatesBaseItemUI from "../base";

const ListLinkedActivatesBaseItemUI: FC<
  Omit<
    ComponentProps<typeof ListLinkedActivatorActivatesBaseItemUI>,
    "listLinkedActivatorActivatesBaseItemUI"
  > & {
    listLinkedActivatesBaseItemUI: { target: ReactNode };
  }
> = ({ listLinkedActivatesBaseItemUI: { target }, ...props }) => (
  <ListLinkedActivatorActivatesBaseItemUI
    listLinkedActivatorActivatesBaseItemUI={{
      linkDescription: "Активируется",
      target,
    }}
    {...props}
  />
);

export default ListLinkedActivatesBaseItemUI;
