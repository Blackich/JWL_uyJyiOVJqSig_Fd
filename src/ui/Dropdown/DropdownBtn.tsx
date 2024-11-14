import "./DropdownBtn.css";
import { Dropdown } from "./Dropdown";
import { FC, HTMLAttributes, useRef, useState } from "react";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  menuItemArray: string[];
  menuItemOnClick?: VoidFunction[];
}

export const DropdownBtn: FC<Props> = ({
  menuItemArray,
  menuItemOnClick,
  className = "",
}) => {
  const [shownDropdown, setDropdownShow] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <button
      className={`dropdown-btn ${className}`}
      onClick={(e) => {
        e.stopPropagation();
        setDropdownShow(!shownDropdown);
      }}
      ref={ref}
    >
      <Dropdown
        shown={shownDropdown}
        onShownChange={setDropdownShow}
        targetRef={ref}
      >
        <div className="dropdown-btn__menu">
          {menuItemArray.map((menuItem, i) => (
            <button
              key={i}
              className="dropdown-btn__menu-item"
              onClick={menuItemOnClick && menuItemOnClick[i]}
            >
              {menuItem}
            </button>
          ))}
        </div>
      </Dropdown>
      <DropdownSVG />
    </button>
  );
};

const DropdownSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#000"
    >
      <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
    </svg>
  );
};
