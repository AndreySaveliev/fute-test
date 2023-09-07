import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { searchBookById } from "../../redux/reducers/bookSlice";
import { Spiner } from "../Spiner/Spiner";

export const BookInfo = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { bookById, pending } = useAppSelector((state) => state.book);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (params.id) {
      dispatch(searchBookById(params.id));
    }
  }, [dispatch, params.id]);

  return (
    <div className="flex flex-col">
      {pending ? (
        <Spiner />
      ) : (
        <>
          <button
            onClick={() => navigate("/")}
            className="self-start bg-accent p-1 rounded-md"
          >
            go back
          </button>
          <div className="flex flex-col self-center p-2">
            <h1 className="text-text font-bold text-lg">
              {bookById.volumeInfo.title}
            </h1>
            <div>
              <img
                src={bookById.volumeInfo.imageLinks.thumbnail}
                className="max-w-md rounded-md float-left"
              />
              <p className="text-text text-right">
                {bookById.volumeInfo.categories}
              </p>
              {bookById.volumeInfo.authors.map((author) => (
                <p className="text-text text-right" key={author}>
                  {author}
                </p>
              ))}
              <p className="text-text text-right">
                {bookById.volumeInfo.description}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
