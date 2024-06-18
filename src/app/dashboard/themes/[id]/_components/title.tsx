import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/server";
import { Suspense, type FC, type HTMLAttributes } from "react";
import ThemesIcon from "../../_components/icon";

const ThemeTitle: FC<
  HTMLAttributes<HTMLDivElement> & { themeTitle: { id: string } }
> = ({ themeTitle: { id }, className, ...props }) => {
  return (
    <div className={cn("flex items-center", className)} {...props}>
      <ThemesIcon className="mr-2 rounded-sm bg-muted p-1 text-muted-foreground" />
      <Suspense fallback={<ThemeTitleContentLoading />}>
        <ThemeTitleContent themeTitleContent={{ id }} />
      </Suspense>
    </div>
  );
};

const ThemeTitleContent: FC<{ themeTitleContent: { id: string } }> = async ({
  themeTitleContent: { id },
}) => {
  const { title } = await api.themes.read({ id });
  return title;
};

const ThemeTitleContentLoading: FC = () => (
  <Skeleton className="inline-block whitespace-pre">{" ".repeat(50)}</Skeleton>
);

export default ThemeTitle;
