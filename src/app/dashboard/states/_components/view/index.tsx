import { type FC } from "react";
import StatesViewList from "./list";
import StatesViewSearch from "./search";

const StatesView: FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <StatesViewSearch className="max-w-xs" />
      </div>
      <StatesViewList />
    </div>
  );
};

export default StatesView;
