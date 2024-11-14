import "./Input.css";
import { CSSProperties, FC, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  placeholder?: string;
  bg?: string;
  width?: string;
}

interface CustomStyleProps extends CSSProperties {
  "--input-active__bg-color": string;
}

export const Input: FC<Props> = ({
  className = "",
  type = "text",
  placeholder,
  width,
  bg,
  ...restProps
}) => {
  return (
    <>
      <div className={`input-wrapper ${className}`}>
        <input
          type={type}
          className="input"
          style={{ width: width }}
          {...restProps}
          required
        />
        <span
          className="input-label"
          style={
            { "--input-active__bg-color": bg ? bg : "#fff" } as CustomStyleProps
          }
        >
          {placeholder}
        </span>
      </div>
    </>
  );
};
