import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { type ComponentProps, type FC } from "react";

const IntentPath: FC<ComponentProps<typeof Breadcrumb>> = () => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link href="/dashboard/intents">Все интенты</Link>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default IntentPath;
