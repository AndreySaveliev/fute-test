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
      <div className="flex" onClick={() => setOpen(!open)}>
        <p className="">{selected}</p>
        <BsChevronCompactDown className="self-center" />
        <div
          className={`${
            open ? "block" : "hidden"
          } absolute p-2 bg-primary right-0 z-10`}
        >
          {open &&
            options.map((option) => (
              <p onClick={() => handleSelectOption(option)} key={option}>
                {option}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
};
