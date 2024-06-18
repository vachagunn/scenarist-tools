import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/trpc/server";
import { Slash } from "lucide-react";
import Link from "next/link";
import { Fragment, Suspense, type ComponentProps, type FC } from "react";

const StatePath: FC<
  ComponentProps<typeof Breadcrumb> & { statePath: { id: string } }
> = async ({ statePath: { id } }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link href="/dashboard/states">Все стейты</Link>
        </BreadcrumbItem>
        <Suspense fallback={<StatePathContentLoading />}>
          <StatePathContent id={id} />
        </Suspense>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const StatePathContent: FC<{ id: string }> = async ({ id }) => {
  const path = await api.states.readPath({ id });
  return (
    <>
      {path.map(({ id, title }) => (
        <Fragment key={id}>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <Link href={`/dashboard/states/${id}`}>{title}</Link>
          </BreadcrumbItem>
        </Fragment>
      ))}
    </>
  );
};

const StatePathContentLoading: FC = () => (
  <>
    {[...Array(3).keys()].map((_, i) => (
      <Fragment key={i}>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <Skeleton key={i} className="inline-block whitespace-pre">
            {" ".repeat(25)}
          </Skeleton>
        </BreadcrumbItem>
      </Fragment>
    ))}
  </>
);

export default StatePath;
