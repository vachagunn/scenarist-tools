import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/server";
import { ChevronRight } from "lucide-react";
import { type Route } from "next";
import Link from "next/link";
import {
  Suspense,
  type ComponentProps,
  type FC,
  type HTMLAttributes,
} from "react";

const User: FC<
  HTMLAttributes<HTMLDivElement> & {
    user: { id: string };
  }
> = ({ user: { id }, className, ...props }) => {
  return (
    <div
      className={cn("flex items-center justify-between gap-6", className)}
      {...props}
    >
      <Suspense
        fallback={
          <>
            <UserContentLoading />
            <UserGoLoading />
          </>
        }
      >
        <UserContent userContent={{ id }} />
        <UserGo href={`/dashboard/users/${id}` as Route} />
      </Suspense>
    </div>
  );
};

export const UserGo: FC<ComponentProps<typeof Link>> = (props) => (
  <Link {...props}>
    <Button variant="outline" size="icon">
      <ChevronRight className="h-4 w-4" />
    </Button>
  </Link>
);

export const UserGoLoading: FC<ComponentProps<typeof Skeleton>> = () => (
  <Skeleton className="h-10 w-10 rounded-md" />
);

export const UserContent: FC<
  HTMLAttributes<HTMLDivElement> & {
    userContent: { id: string; caption?: string };
  }
> = async ({ userContent: { id, caption }, className, ...props }) => {
  const { fullName, email, pictureUrl } = await api.users.read({ id });
  return (
    <div className={cn("flex gap-4", className)} {...props}>
      <Avatar className="hidden h-9 w-9 sm:flex">
        <AvatarImage src={pictureUrl ?? undefined} alt={`Аватар ${fullName}`} />
        <AvatarFallback>{fullName}</AvatarFallback>
      </Avatar>
      <div className="grid gap-1">
        <p className="text-sm font-medium leading-none">{fullName}</p>
        <p className="text-sm text-muted-foreground">{caption ?? email}</p>
      </div>
    </div>
  );
};

export const UserContentLoading: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div className={cn("flex gap-4", className)} {...props}>
    <Skeleton className="hidden h-9 w-9 rounded-full sm:flex" />
    <div className="grid gap-1">
      <Skeleton className="whitespace-pre text-sm font-medium leading-none">
        {" ".repeat(50)}
      </Skeleton>
      <Skeleton className="whitespace-pre text-sm text-muted-foreground ">
        {" ".repeat(50)}
      </Skeleton>
    </div>
  </div>
);

export default User;
