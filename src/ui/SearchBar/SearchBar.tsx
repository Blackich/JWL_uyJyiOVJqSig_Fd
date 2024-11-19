import "./SearchBar.css";
import { ChangeEvent, FC, useEffect, useState } from "react";

type Props = {
  query: string;
  rowsNumber?: number;
  type?: "number" | "text";
  isAproveValue: boolean | null;
  searchData: number[] | string[];
  setQuery: (query: string) => void;
  setAproveValue: (value: boolean | null) => void;
};

export const SearchBar: FC<Props> = ({
  query,
  setQuery,
  searchData,
  type = "text",
  isAproveValue,
  setAproveValue,
  rowsNumber = 5,
}) => {
  const [isOpenDropdown, setOpenDropdown] = useState<boolean>(false);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setAproveValue(false);
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (query.length === 0) setOpenDropdown(false);
  }, [query]);
  return (
    <>
      <div className="search-bar">
        <input
          type={type}
          className="search-bar__input"
          placeholder="Поиск..."
          value={query}
          onChange={(e) => {
            setOpenDropdown(true);
            onChangeInput(e);
          }}
        />

        <div className="search-bar__icon">
          {query.length > 0 ? (
            <div
              className="clear-search-bar"
              onClick={() => {
                setQuery("");
                setAproveValue(null);
              }}
            >
              <ClearSvg />
            </div>
          ) : (
            <SearchSvg />
          )}
        </div>

        <div className="search-bat__status">
          {isAproveValue === null ? null : isAproveValue === true ? (
            <DoneSvg />
          ) : (
            <WarnSvg />
          )}
        </div>

        {isOpenDropdown && (
          <div className="search-bar__dropdown">
            {searchData
              .filter((item) => String(item).includes(query))
              .slice(0, rowsNumber)
              .map((item) => (
                <div
                  className="search-bar__dropdown-item"
                  key={item}
                  onClick={() => {
                    setQuery(String(item));
                    setAproveValue(true);
                    setOpenDropdown(false);
                  }}
                >
                  {item}
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
};

const SearchSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    fill="#1D1D1B"
  >
    <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
  </svg>
);

const DoneSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    fill="#03A000"
  >
    <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q65 0 123 19t107 53l-58 59q-38-24-81-37.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-18-2-36t-6-35l65-65q11 32 17 66t6 70q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-56-216L254-466l56-56 114 114 400-401 56 56-456 457Z" />
  </svg>
);

const WarnSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    fill="#c99700"
  >
    <path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
  </svg>
);

const ClearSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    fill="#000"
  >
    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
  </svg>
);
