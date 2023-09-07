import React, { useState } from "react";
import { Selector } from "../Selector/Selector";
import { genres, sortOptions } from "../../assets/genras";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { searchBooks, setBookName } from "../../redux/reducers/bookSlice";

export const SearchInput = () => {
  const dispatch = useAppDispatch();
  const { title, category, orderBy, bookLoaded } = useAppSelector(
    (state) => state.book
  );
  const [value, setValue] = useState(title);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSearchBooks = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setBookName({ value }));
    dispatch(
      searchBooks({
        title: value,
        category: category === "all" ? "" : category,
        orderBy,
        bookLoaded,
      })
    );
  };

  return (
    <form
      className="flex flex-col relativ my-8 w-1/2"
      onSubmit={(e) => handleSearchBooks(e)}
    >
      <div className="relative">
        <input
          className="w-full px-3 py-4 rounded-md outline-accent outline font-sans"
          placeholder="What is it you want to read?"
          value={value}
          onChange={(e) => handleChange(e)}
        />
        <button
          className="text-text bg-primary absolute right-0 h-full rounded-md px-3 font-sans"
          type="submit"
        >
          Search
        </button>
      </div>
      <Selector options={genres} text={"Category"} />
      <Selector options={sortOptions} text={"Sort by"} />
    </form>
  );
};
