import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { type ComponentProps, type FC } from "react";

export const NestedList: FC<ComponentProps<typeof Accordion>> = ({
  ...props
}) => <Accordion {...props} />;

export const NestedListItem: FC<ComponentProps<typeof AccordionItem>> = ({
  className,
  ...props
}) => <AccordionItem className={cn("border-b-0", className)} {...props} />;

export const NestedListTrigger: FC<ComponentProps<typeof AccordionTrigger>> = ({
  className,
  ...props
}) => (
  <AccordionTrigger
    className={cn(
      "w-full flex-row-reverse justify-end gap-2 py-0 font-normal hover:no-underline",
      className,
    )}
    {...props}
  />
);

export const NestedListContent: FC<ComponentProps<typeof AccordionContent>> = ({
  className,
  ...props
}) => (
  <AccordionContent className={cn("pl-4 text-base", className)} {...props} />
);
