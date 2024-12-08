import "./DropdownSelect.css";
import { Dropdown } from "./Dropdown";
import {
  Dispatch,
  FC,
  HTMLAttributes,
  SetStateAction,
  useRef,
  useState,
} from "react";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  label: string;
  itemId: number;
  menuItemArray: string[];
  setChosenItemId: Dispatch<SetStateAction<number>>;
}

export const DropdownSelect: FC<Props> = ({
  label,
  itemId,
  menuItemArray,
  setChosenItemId,
  className = "",
}) => {
  const [shownDropdown, setDropdownShow] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      className={`dropdown-select ${className} ${
        shownDropdown ? "active" : ""
      }`}
      onClick={(e) => {
        e.stopPropagation();
        setDropdownShow(!shownDropdown);
      }}
      ref={ref}
    >
      {itemId === 0 && !inputValue ? (
        <p style={{ color: "#616161cc" }}>{label}</p>
      ) : (
        inputValue
      )}
      <Dropdown
        shown={shownDropdown}
        onShownChange={setDropdownShow}
        targetRef={ref}
        style={{ width: ref.current?.offsetWidth }}
      >
        <div className="dropdown-select__menu">
          {menuItemArray.map((menuItem, i) => (
            <button
              key={i}
              className={`dropdown-select__menu-item ${
                itemId === i + 1 ? "active" : ""
              }`}
              onClick={() => {
                setChosenItemId(i + 1);
                setInputValue(menuItemArray[i]);
              }}
            >
              {menuItem}
            </button>
          ))}
        </div>
      </Dropdown>
      <div className={`dropdown-select__svg ${shownDropdown ? "active" : ""}`}>
        <ArrowDropdownSVG />
      </div>
    </div>
  );
};

const ArrowDropdownSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#0000008a"
    >
      <path d="M480-360 280-560h400L480-360Z" />
    </svg>
  );
};
