import ListBaseItemUI from "@/app/dashboard/_components/list/items/base";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Globe } from "lucide-react";
import { type ComponentProps, type FC, type ReactNode } from "react";

const ActivatorsListBaseItemUI: FC<
  ComponentProps<typeof ListBaseItemUI> & {
    activatorsListBaseItemUI: { targetActivator: ReactNode };
  }
> = ({ activatorsListBaseItemUI: { targetActivator }, children, ...props }) => (
  <Dialog>
    <DialogTrigger asChild>
      <ListBaseItemUI {...props}>{children}</ListBaseItemUI>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="flex items-center">{children}</DialogTitle>
        <DialogDescription>Активатор</DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-4">{targetActivator}</div>
    </DialogContent>
  </Dialog>
);

export const GlobalIndicator: FC<ComponentProps<typeof Globe>> = (props) => (
  <Globe {...props} />
);

export default ActivatorsListBaseItemUI;
