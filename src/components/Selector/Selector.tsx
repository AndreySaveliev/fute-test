import { useState } from "react";
import { BsChevronCompactDown } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setCategory, setOrderBy } from "../../redux/reducers/bookSlice";
export const Selector = ({
  text,
  options,
}: {
  text: string;
  options: string[];
}) => {
  const { category, orderBy } = useAppSelector((state) => state.book);
  const [selected, setSelected] = useState(
    text !== "Category" ? orderBy : category
  );
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleSelectOption = (opt: string) => {
    console.log(opt);
    if (text !== "Category") {
      dispatch(setOrderBy({ selected: opt }));
    } else {
      dispatch(setCategory({ selected: opt }));
    }
    setSelected(opt);
  };

  return (
    <div className="flex flex-row justify-between">
      <h2 className="">{text}</h2>
      <div
        className="flex min-w-[90px] justify-end"
        onClick={() => setOpen(!open)}
      >
        <p className="">{selected}</p>
        <BsChevronCompactDown className="self-center" />
        <div
          className={`${
            open ? "block" : "hidden"
          } absolute p-2 bg-primary z-10`}
        >
          <div className="flex flex-col">
            {open &&
              options.map((option) => (
                <button onClick={() => handleSelectOption(option)} key={option}>
                  {option}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
