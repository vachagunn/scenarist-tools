import { cn } from "@/lib/utils";
import { api } from "@/trpc/server";
import { type Route } from "next";
import {
  Suspense,
  type ComponentProps,
  type FC,
  type HTMLAttributes,
} from "react";
import { UserContent, UserContentLoading, UserGo, UserGoLoading } from "./user";

const Scenarist: FC<
  HTMLAttributes<HTMLDivElement> & {
    scenarist: { id: string };
  }
> = ({ scenarist: { id }, className, ...props }) => {
  return (
    <div className={cn("flex justify-between gap-6", className)} {...props}>
      <Suspense fallback={<ScenaristLoading />}>
        <ScenaristContent scenaristContent={{ id }} />
        <UserGo href={`/dashboard/scenarists/${id}` as Route} />
      </Suspense>
    </div>
  );
};

export const ScenaristLoading: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={cn("flex w-full justify-between gap-6", className)}
    {...props}
  >
    <ScenaristContentLoading />
    <UserGoLoading />
  </div>
);

const ScenaristContent: FC<
  Omit<ComponentProps<typeof UserContent>, "userContent"> & {
    scenaristContent: { id: string };
  }
> = async ({ scenaristContent: { id } }) => {
  const { userId } = await api.scenarists.read({ id });
  return <UserContent userContent={{ id: userId, caption: "Сценарист" }} />;
};

const ScenaristContentLoading: FC<ComponentProps<typeof UserContentLoading>> = (
  props,
) => <UserContentLoading {...props} />;

export default Scenarist;
