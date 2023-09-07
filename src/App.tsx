import "./App.css";
import { SearchInput } from "./components/SearchInput/SearchInput";
import { BookSection } from "./components/BookSection/BookSection";
import { Route, Routes } from "react-router-dom";
import { BookInfo } from "./components/BookInfo/BookInfo";
import { LoadMore } from "./components/LoadMore/LoadMore";
import { useAppSelector } from "./redux/hooks";

function App() {
  const { books, bookLoaded, totalCount } = useAppSelector(
    (state) => state.book
  );

  return (
    <div className="w-full flex items-center flex-col mb-20">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SearchInput />
              <BookSection />
              {books.length > 0 && bookLoaded < totalCount && <LoadMore />}
            </>
          }
        />
        <Route path="/:id" element={<BookInfo />} />
      </Routes>
    </div>
  );
}

export default App;
