import "./Button.css";
import { FC, ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  width?: string;
}

export const Button: FC<Props> = ({
  children,
  loading = false,
  className = "",
  onClick,
  width,
  ...restProps
}) => {
  return (
    <>
      <div className={`button-wrapper ${className}`}>
        <button
          className="button"
          onClick={loading ? undefined : onClick}
          style={{ width: width }}
          {...restProps}
        >
          {children}
        </button>
      </div>
    </>
  );
};
