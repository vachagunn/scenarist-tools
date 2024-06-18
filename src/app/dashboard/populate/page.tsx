import { api } from "@/trpc/server";

const PopulatePage = async () => {
  await api.users.me.populateDatabase();
  return "populated";
};

export default PopulatePage;
