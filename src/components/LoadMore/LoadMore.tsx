import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { searchMore } from "../../redux/reducers/bookSlice";
import { Spiner } from "../Spiner/Spiner";

export const LoadMore = () => {
  const dispatch = useAppDispatch();

  const { title, category, orderBy, bookLoaded, pending } = useAppSelector(
    (state) => state.book
  );

  const handleLoadMore = () => {
    dispatch(
      searchMore({
        title,
        category,
        orderBy,
        bookLoaded,
      })
    );
  };

  if (pending) {
    return <Spiner />;
  } else {
    return <button onClick={() => handleLoadMore()}>Load More</button>;
  }
};
