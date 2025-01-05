import { FC, ReactNode } from "react";
import { ModalWrapper } from "@ui/ModalWrapper/ModalWrapper";

type PropsWrapper = {
  shown: boolean;
  onClose: VoidFunction;
  errorImage: ReactNode;
  title: string;
  text: string;
};

export const ErrorModalWrapper: FC<PropsWrapper> = ({
  text,
  shown,
  title,
  onClose,
  errorImage,
}) => {
  return (
    <ModalWrapper shown={shown} onClose={onClose}>
      <div className="payment-modal__error">
        <div className="payment-modal__error-image">{errorImage}</div>
        <div className="payment-modal__title">
          {title}
          <div className="payment-modal__text">{text}</div>
        </div>
      </div>
    </ModalWrapper>
  );
};
