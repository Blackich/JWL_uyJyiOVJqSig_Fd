import "./DropdownSelect.css";
import { Dropdown } from "./Dropdown";
import {
  CSSProperties,
  Dispatch,
  FC,
  HTMLAttributes,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  bg?: string;
  label: string;
  itemId: number;
  menuItemArray?: { id: number; name: string }[];
  setChosenItemId: Dispatch<SetStateAction<number>>;
}

export const DropdownSelect: FC<Props> = ({
  bg,
  label,
  itemId,
  menuItemArray,
  setChosenItemId,
  className = "",
}) => {
  const [shownDropdown, setDropdownShow] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (itemId === 0) return;
    const name = menuItemArray?.find((item) => item.id === itemId)?.name;
    setInputValue(name || "");
  }, [itemId, menuItemArray]);

  useEffect(() => {
    const handleResize = () => {
      setDropdownShow(false);
    };
    if (shownDropdown) {
      window.addEventListener("resize", handleResize);
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [shownDropdown]);

  return (
    <div
      className={`dropdown-select ${className} ${
        shownDropdown ? "active" : ""
      }`}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && e.currentTarget.click()}
      onClick={(e) => {
        e.stopPropagation();
        setDropdownShow(!shownDropdown);
      }}
      ref={ref}
    >
      <p
        className={`dropdown-select__label ${
          itemId === 0 && !shownDropdown ? "" : "up"
        }`}
        style={
          { "--select-active__bg-color": bg ? bg : "#fff" } as CSSProperties
        }
      >
        {label}
      </p>
      <p>{inputValue}</p>
      {menuItemArray && menuItemArray.length > 0 && (
        <Dropdown
          shown={shownDropdown}
          onShownChange={setDropdownShow}
          targetRef={ref}
          style={{ width: ref.current?.offsetWidth }}
        >
          <div className="dropdown-select__menu">
            {menuItemArray?.map((menuItem, i) => (
              <button
                key={i}
                className={`dropdown-select__menu-item ${
                  itemId === i + 1 ? "active" : ""
                }`}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.currentTarget.click();
                  }
                }}
                onClick={() => setChosenItemId(menuItem.id || 0)}
              >
                {menuItem.name}
              </button>
            ))}
          </div>
        </Dropdown>
      )}
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
