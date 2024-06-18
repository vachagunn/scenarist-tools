import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { type ComponentProps, type FC } from "react";

const ThemePath: FC<ComponentProps<typeof Breadcrumb>> = () => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link href="/dashboard/themes">Все темы</Link>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default ThemePath;
