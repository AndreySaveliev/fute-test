import { Book } from "../../redux/reducers/bookSlice";
import { useNavigate } from "react-router-dom";
import notFoundImg from "../../assets/not-found-icon-28.jpg";

export const BookCard = ({ book }: { book: Book }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${book.id}`);
  };

  return (
    <div
      className="flex flex-row w-98 relative justify-between hover:bg-accent p-4 rounded-md group cursor-pointer hover:shadow-md"
      onClick={() => handleClick()}
    >
      <img
        src={
          book.volumeInfo.imageLinks?.thumbnail
            ? book.volumeInfo.imageLinks?.thumbnail
            : notFoundImg
        }
        alt="book img"
        className="object-cover w-36 md:w-24 lg:w-36 h-fit"
      />
      <div className="flex flex-col overflow-hidden text-ellipsis w-full">
        <h3 className="font-sans text-lg text-text whitespace-nowrap group-hover:whitespace-normal font-semibold">
          {book.volumeInfo.title}
        </h3>
        <p className="text-text text-right">
          {book.volumeInfo.categories && book.volumeInfo.categories[0]}
        </p>
        <p className="text-text text-right">{book.volumeInfo.authors}</p>
      </div>
    </div>
  );
};
