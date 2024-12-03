import "./DeleteUserModal.css";
import { FC } from "react";
import { PersonRemoveSVG } from "@User/utils/svg/HomeSvg";
import { ModalWrapper } from "@ui/ModalWrapper/ModalWrapper";
import { Button } from "@ui/Button/Button";
import { useTranslation } from "react-i18next";
import { ActivatedService, UserSocial } from "@User/utils/types";

type Props = {
  username?: string;
  shownModal: boolean;
  onClose: VoidFunction;
  userList?: UserSocial[];
  activeServices?: ActivatedService[];
  handleDeleteInstUser: VoidFunction;
};

export const DeleteUserModal: FC<Props> = ({
  onClose,
  username,
  userList,
  shownModal,
  activeServices,
  handleDeleteInstUser,
}) => {
  const { t } = useTranslation();
  const nicknameId = userList?.find((user) => user.nickname === username)?.id;
  const matchedService = !!activeServices?.find(
    (service) => service.socialNicknameId === nicknameId,
  );

  if (nicknameId && matchedService)
    return (
      <>
        <ModalWrapper shown={shownModal} onClose={onClose}>
          <div className="delete-user-modal">
            <div className="inst-modal__remove-image">
              <PersonRemoveSVG />
            </div>
            <div className="inst-modal__title">
              {t("modal.cannot_delete_user_title")}
            </div>
            <div className="inst-modal__description">
              {t("modal.cannot_delete_user_description")}
            </div>
          </div>
        </ModalWrapper>
      </>
    );

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
            style={{ width: "150px", backgroundColor: "#c81414b3" }}
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
