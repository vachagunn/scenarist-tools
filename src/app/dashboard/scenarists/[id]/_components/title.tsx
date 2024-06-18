import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/server";
import { Suspense, type FC, type HTMLAttributes } from "react";

const ScenaristTitle: FC<
  HTMLAttributes<HTMLDivElement> & { scenaristTitle: { id: string } }
> = ({ scenaristTitle: { id }, className, ...props }) => {
  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      <Suspense fallback={<ScenaristTitleContentLoading />}>
        <ScenaristTitleContent scenaristTitleContent={{ id }} />
      </Suspense>
    </div>
  );
};

const ScenaristTitleContent: FC<{
  scenaristTitleContent: { id: string };
}> = async ({ scenaristTitleContent: { id } }) => {
  const { userId } = await api.scenarists.read({ id });
  const user = await api.users.read({ id: userId });
  return (
    <>
      <Avatar>
        {/* eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing */}
        <AvatarImage src={user.pictureUrl || undefined} />
        <AvatarFallback>{user.fullName}</AvatarFallback>
      </Avatar>
      <div>{user.fullName}</div>
    </>
  );
};

const ScenaristTitleContentLoading: FC = () => (
  <>
    <Skeleton className="h-10 w-10 rounded-full" />
    <Skeleton className="whitespace-pre">{" ".repeat(50)}</Skeleton>
  </>
);

export default ScenaristTitle;
