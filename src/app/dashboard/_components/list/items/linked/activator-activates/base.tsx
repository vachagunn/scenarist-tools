import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Globe, type LucideIcon } from "lucide-react";
import { type ComponentProps, type FC, type ReactNode } from "react";
import ListBaseItemUI, { ListBaseItemUIIcon } from "../../base";

const ListLinkedActivatorActivatesBaseItemUI: FC<
  ComponentProps<typeof ListBaseItemUI> & {
    listLinkedActivatorActivatesBaseItemUI: {
      target: ReactNode;
      linkDescription: string;
    };
  }
> = ({
  listLinkedActivatorActivatesBaseItemUI: { target, linkDescription },
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
      <div className="flex flex-col gap-4">{target}</div>
    </DialogContent>
  </Dialog>
);

export const ListLinkedActivatorActivatesItemContentUI: FC<{
  listLinkedActivatorActivatesItemContentUI: {
    Icon: LucideIcon;
    link: { isGlobal: boolean; target: { title: string } };
  };
}> = ({
  listLinkedActivatorActivatesItemContentUI: {
    Icon,
    link: {
      isGlobal,
      target: { title },
    },
  },
}) => (
  <>
    <ListBaseItemUIIcon>
      <Icon />
    </ListBaseItemUIIcon>
    {isGlobal && (
      <ListBaseItemUIIcon>
        <GlobalIndicator />
      </ListBaseItemUIIcon>
    )}
    {title}
  </>
);

export const GlobalIndicator = Globe;

export default ListLinkedActivatorActivatesBaseItemUI;
