import "./Tooltip.css";
import { CSSProperties, FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  tooltip?: string | ReactNode;
  postion?: string;
};

export const Tooltip: FC<Props> = ({ children, tooltip, postion }) => {
  return (
    <div className="tooltip-container">
      {children}
      <span
        className="tooltip"
        style={
          {
            "--tooltip-position": postion ? postion : "bottom",
          } as CSSProperties
        }
      >
        {tooltip}
      </span>
    </div>
  );
};
