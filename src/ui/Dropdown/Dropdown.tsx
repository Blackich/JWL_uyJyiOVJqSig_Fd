import "./Dropdown.css";
import {
  FC,
  HTMLAttributes,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { createFocusTrap } from "focus-trap";
import throttle from "lodash.throttle";

interface DropdownProps extends HTMLAttributes<HTMLElement> {
  targetRef: RefObject<HTMLElement>;
  shown: boolean;
  onShownChange: (shown: boolean) => void;
}

const calcCoords = (targetElement: HTMLElement) => {
  const rect = targetElement.getBoundingClientRect();

  return {
    top: window.scrollY + rect.bottom + 12,
    right: window.innerWidth - rect.right - window.scrollX,
  };
};

export const Dropdown: FC<DropdownProps> = ({
  targetRef,
  shown,
  onShownChange,
  children,
  style,
  className = "",
  ...restProps
}: DropdownProps) => {
  const [coords, setCoords] = useState({ top: 0, right: 0 });
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const trap = createFocusTrap(ref.current as HTMLDivElement, {
      allowOutsideClick: true,
    });

    if (shown) {
      trap.activate();
      setCoords(calcCoords(targetRef.current as HTMLElement));
    }

    return () => {
      trap.deactivate();
    };
  }, [shown, targetRef]);

  useEffect(() => {
    onShownChange(shown);
  }, [shown, onShownChange]);

  useEffect(() => {
    const documentClickListener = () => {
      onShownChange(false);
    };

    const windowResizeListener = throttle(() => {
      setCoords(calcCoords(targetRef.current as HTMLElement));
    }, 100);

    if (shown) {
      document.addEventListener("click", documentClickListener);
      document.addEventListener("scroll", documentClickListener);
      window.addEventListener("resize", windowResizeListener);
    }
    return () => {
      document.removeEventListener("click", documentClickListener);
      document.addEventListener("scroll", documentClickListener);
      window.removeEventListener("resize", windowResizeListener);
    };
  }, [onShownChange, shown, targetRef]);

  return createPortal(
    shown && (
      <div
        ref={ref}
        {...restProps}
        className={`dropdown ${className || ""}`}
        style={{ ...style, ...coords }}
      >
        {children}
      </div>
    ),
    document.getElementById("overlay") as HTMLElement,
  );
};
