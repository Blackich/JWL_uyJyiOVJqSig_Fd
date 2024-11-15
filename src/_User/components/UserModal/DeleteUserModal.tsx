import "./DeleteUserModal.css";
import { FC } from "react";
import { PersonRemoveSVG } from "@User/utils/svg/HomeSvg";
import { ModalWrapper } from "@ui/ModalWrapper/ModalWrapper";
import { Button } from "@ui/Button/Button";
import { useTranslation } from "react-i18next";

type Props = {
  username?: string;
  shownModal: boolean;
  onClose: VoidFunction;
  handleDeleteInstUser: VoidFunction;
};

export const DeleteUserModal: FC<Props> = ({
  shownModal,
  onClose,
  username,
  handleDeleteInstUser,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <ModalWrapper shown={shownModal} onClose={onClose}>
        <div className="delete-user-modal">
          <div className="inst-modal__remove-image">
            <PersonRemoveSVG />
          </div>
          <div className="inst-modal__title">
            {t("modal.delete_user_title")}
          </div>

          <div className="inst-modal__description">
            {t("modal.delete_user_description")} <span>{username}</span>?
          </div>
          <Button
            className="inst-modal__button"
            width="150px"
            onClick={handleDeleteInstUser}
            aria-label={t("modal.delete_user_delete_btn_aria", {
              name: username,
            })}
          >
            {t("modal.delete_user_delete_btn")}
          </Button>
        </div>
      </ModalWrapper>
    </>
  );
};
