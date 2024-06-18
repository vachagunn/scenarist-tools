import List from "@/app/dashboard/_components/list";
import { api } from "@/trpc/server";
import { type ComponentProps, type FC } from "react";
import ListThemeItem from "./item";

const ThemesList: FC<ComponentProps<typeof List>> = (props) => {
  return (
    <List {...props}>
      <ThemesListContent />
    </List>
  );
};

const ThemesListContent: FC = async () => {
  const themes = await api.themes.list({});
  return (
    <>
      {themes.map(({ id }) => (
        <ListThemeItem key={id} listThemeItem={{ id }} />
      ))}
    </>
  );
};

export default ThemesList;
