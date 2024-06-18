import { type ComponentProps, type FC, type ReactNode } from "react";
import ListLinkedActivatorActivatesBaseItemUI from "../base";

const ListLinkedActivatorBaseItemUI: FC<
  Omit<
    ComponentProps<typeof ListLinkedActivatorActivatesBaseItemUI>,
    "listLinkedActivatorActivatesBaseItemUI"
  > & {
    listLinkedActivatorBaseItemUI: { target: ReactNode };
  }
> = ({ listLinkedActivatorBaseItemUI: { target }, ...props }) => (
  <ListLinkedActivatorActivatesBaseItemUI
    listLinkedActivatorActivatesBaseItemUI={{
      linkDescription: "Активатор",
      target,
    }}
    {...props}
  />
);

export default ListLinkedActivatorBaseItemUI;
