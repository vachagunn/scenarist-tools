import { Suspense, type FC, type HTMLAttributes } from "react";
import { ListBaseItemUILoading } from "./items/base";

const List: FC<HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return (
    <div {...props}>
      <Suspense fallback={<ListContentLoading />}>{children}</Suspense>
    </div>
  );
};

const ListContentLoading: FC = () => (
  <>
    {[...Array(3).keys()].map((key) => (
      <ListBaseItemUILoading key={key} />
    ))}
  </>
);

export default List;
