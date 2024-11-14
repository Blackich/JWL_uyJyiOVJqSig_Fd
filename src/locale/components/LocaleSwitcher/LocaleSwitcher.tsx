import "./LocaleSwitcher.css";
import { FC, useState, useRef } from "react";
import { LocaleSwitcherButton } from "../LocaleSwitcherButton/LocaleSwitcherButton";
import { LocaleSwitcherMenu } from "../LocaleSwitcherMenu/LocaleSwitcherMenu";
import { Dropdown } from "@ui/Dropdown/Dropdown";
import { useLocale } from "../../hooks";

export const LocaleSwitcher: FC = () => {
  const { locale, setLocale } = useLocale();
  const [dropdownShown, setDropdownShown] = useState(false);
  const targetRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="locale-switcher">
      <LocaleSwitcherButton
        onClick={(event) => {
          event.stopPropagation();
          setDropdownShown(!dropdownShown);
        }}
        ref={targetRef}
        locale={locale}
        opened={dropdownShown}
      />
      <Dropdown
        shown={dropdownShown}
        onShownChange={setDropdownShown}
        targetRef={targetRef}
      >
        <LocaleSwitcherMenu
          className="locale-switcher__dropdown-menu"
          onChangeLocale={(locale) => setLocale(locale)}
        />
      </Dropdown>
    </div>
  );
};
