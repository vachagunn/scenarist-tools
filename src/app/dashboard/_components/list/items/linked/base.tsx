import ListBaseItemUI from "@/app/dashboard/_components/list/items/base";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { type ComponentProps, type FC, type ReactNode } from "react";

const ListLinkedItemBaseUI: FC<
  ComponentProps<typeof ListBaseItemUI> & {
    listLinkedItemBaseUI: { targetItem: ReactNode; linkDescription: string };
  }
> = ({
  listLinkedItemBaseUI: { targetItem, linkDescription },
  children,
  ...props
}) => (
  <Dialog>
    <DialogTrigger asChild>
      <ListBaseItemUI {...props}>{children}</ListBaseItemUI>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="flex items-center">{children}</DialogTitle>
        <DialogDescription>{linkDescription}</DialogDescription>
      </DialogHeader>
      {targetItem}
    </DialogContent>
  </Dialog>
);

export default ListLinkedItemBaseUI;
