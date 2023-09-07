import { useAppSelector } from "../../redux/hooks";
import { BookCard } from "../BookCard/BookCard";

export const BookSection = () => {
  const { books, totalCount } = useAppSelector((state) => state.book);
  return (
    <section>
      {totalCount !== 0 && <p>Find {totalCount}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {books.map((book, key) => (
          <BookCard book={book} key={key} />
        ))}
      </div>
    </section>
  );
};
