import "./ModalWrapper.css";
import { FC, HTMLAttributes, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { createFocusTrap } from "focus-trap";
import { CloseSVG } from "@User/utils/svg/HomeSvg";
import { useTranslation } from "react-i18next";

interface ModalWrapperProps extends HTMLAttributes<HTMLElement> {
  alignX?: "start" | "center" | "end";
  alignY?: "start" | "center" | "end";
  onClose: VoidFunction;
  shown: boolean;
}

export const ModalWrapper: FC<ModalWrapperProps> = ({
  children,
  alignX = "center",
  alignY = "center",
  onClose,
  shown,
  ...restProps
}: ModalWrapperProps) => {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const trap = createFocusTrap(ref.current as HTMLDivElement, {
      allowOutsideClick: true,
    });

    if (shown) {
      trap.activate();
      document.documentElement.classList.add("--prevent-scroll");
    }

    return () => {
      trap.deactivate();
      document.documentElement.classList.remove("--prevent-scroll");
    };
  }, [shown]);

  useEffect(() => {
    const documentKeydownListener = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", documentKeydownListener);
    return () => {
      document.removeEventListener("keydown", documentKeydownListener);
    };
  }, [onClose]);

  return createPortal(
    shown && (
      <div
        className={`modal-wrapper 
          modal-wrapper--alignY-${alignY} 
          modal-wrapper--alignX-${alignX}`}
        onClick={onClose}
        {...restProps}
        role="dialog"
      >
        <div
          className="modal-wrapper__children"
          onKeyDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
          ref={ref}
        >
          <div
            className="modal-wrapper__close-btn"
            onClick={onClose}
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && e.currentTarget.click()}
            role="button"
            aria-label={t("modal.close_btn_aria")}
          >
            <CloseSVG />
          </div>
          {children}
        </div>
      </div>
    ),
    document.getElementById("overlay") as HTMLElement,
  );
};
