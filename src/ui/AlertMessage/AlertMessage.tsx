import "./AlertMessage.css";
import { FC, useRef } from "react";
import { CloseSVG } from "@User/utils/svg/HomeSvg";
import { createPortal } from "react-dom";

type Props = {
  type?: "success" | "error" | "warning" | "info";
  message?: string;
  isOpen?: boolean;
  onClose?: VoidFunction;
};

export const AlertMessage: FC<Props> = ({
  type = "success",
  message = "message",
  isOpen,
  onClose,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const toggleDialog = () => {
    if (!dialogRef.current) return;

    return dialogRef.current.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.show();
  };

  const onCloseHandler = () => {
    if (onClose) {
      onClose();
    }
  };

  const onClickCloseBtn = () => {
    if (onClose) {
      dialogRef.current?.classList.add("closing");
      setTimeout(() => {
        onClose();
      }, 1000);
    }
  };

  if (isOpen) {
    setTimeout(() => {
      onCloseHandler();
    }, 5000);
  }

  return createPortal(
    isOpen && (
      <dialog
        ref={dialogRef}
        className={`alert-message ${type}`}
        onClick={(e) => {
          if (e.currentTarget === e.target) toggleDialog();
        }}
        open={isOpen ? true : false}
      >
        <div className="alert-message__text">{message}</div>
        <button className="alert-message__close-btn" onClick={onClickCloseBtn}>
          <CloseSVG />
        </button>
      </dialog>
    ),
    document.getElementById("overlay") as HTMLElement,
  );
};
