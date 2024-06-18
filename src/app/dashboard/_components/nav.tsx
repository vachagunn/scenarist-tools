import { type LucideIcon } from "lucide-react";
import { type Route } from "next";
import Link from "next/link";
import { type FC } from "react";
import IntentsIcon from "../intents/_components/icon";
import StatesIcon from "../states/_components/icon";
import ThemesIcon from "../themes/_components/icon";
import DashboardIcon from "./icon";

const routes: { title: string; Icon: LucideIcon; href: Route }[] = [
  { href: "/dashboard", title: "Главная", Icon: DashboardIcon },
  { href: "/dashboard/themes", title: "Темы", Icon: ThemesIcon },
  { href: "/dashboard/states", title: "Стейты", Icon: StatesIcon },
  { href: "/dashboard/intents", title: "Интенты", Icon: IntentsIcon },
];

const DashboardNav: FC = () => {
  return (
    <>
      {routes.map(({ href, Icon, title }) => (
        <Link
          key={href}
          href={href}
          className="flex flex-col items-center px-2 py-4 hover:bg-secondary"
        >
          <Icon className="h-6 w-6 text-muted-foreground" />
          <div className="w-full text-center text-sm">{title}</div>
        </Link>
      ))}
    </>
  );
};

export default DashboardNav;
