import { FC, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  w?: number;
  h?: number;
  br?: number;
  mt?: number;
  mb?: number;
  type?: "dark" | "light";
}

export const Skeleton: FC<Props> = ({ w, h, br, type, mt, mb }) => {
  return (
    <div
      className={`skeleton${type === "dark" ? "-dark" : ""}`}
      style={{
        width: w ? `${w}px` : "100%",
        height: h ? `${h}px` : "1em",
        borderRadius: br ? `${br}%` : "5px",
        marginTop: mt ? `${mt}px` : "0",
        marginBottom: mb ? `${mb}px` : "0",
      }}
    ></div>
  );
};
