import "./AddUserModal.css";
import { FC, useState } from "react";
import { ModalWrapper } from "@/ui/ModalWrapper/ModalWrapper";
import { Button } from "@ui/Button/Button";
import { PersonAddSVG } from "@User/utils/svg/HomeSvg";
import { Input } from "@ui/Input/Input";
import { userHomeApi } from "@User/pages/Home/_homeApi";
import { authUser } from "@User/auth/_authApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { AlertMessage } from "@/ui/AlertMessage/AlertMessage";
import { useTranslation } from "react-i18next";

type Props = {
  shownModal: boolean;
  onClose: VoidFunction;
};

export const AddUserModal: FC<Props> = ({ shownModal, onClose }) => {
  const { t } = useTranslation();
  const [username, setUsername] = useState<string>("");
  const [isOpenAlertSuccess, setOpenAlertSuccess] = useState<boolean>(false);
  const [isOpenAlertError, setOpenAlertError] = useState<boolean>(false);
  const { data: userCred } = authUser.useCheckAuthUserQuery();
  const { refetch: updateSocialAccList } = userHomeApi.useGetSocialListQuery(
    (userCred?.id as number) || skipToken,
  );
  const [fetchAddInstAccount] = userHomeApi.useAddInstAccountMutation();

  const _onCloseClearInput = () => {
    onClose();
    setUsername("");
  };

  // validation add inst acc
  const handleAddInstUser = async () => {
    await fetchAddInstAccount({ id: userCred?.id as number, username }).then(
      (res) => {
        if (res?.data) return setOpenAlertSuccess(true);
        if (res?.error) return setOpenAlertError(true);
      },
    );
    updateSocialAccList();
    setUsername("");
    onClose();
  };

  return (
    <>
      <ModalWrapper shown={shownModal} onClose={_onCloseClearInput}>
        <div className="add-user-modal">
          <div className="inst-modal__image">
            <PersonAddSVG />
          </div>
          <div className="inst-modal__title">{t("modal.add_user_title")}</div>

          <Input
            placeholder="@username"
            className="inst-modal__input"
            width="250px"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            aria-label={t("modal.add_user_input_aria")}
          />

          <div className="inst-modal__description">
            {t("modal.add_user_description")}
          </div>
          <Button
            className="inst-modal__button"
            width="150px"
            onClick={handleAddInstUser}
            aria-label={t("modal.add_user_add_btn_aria", {
              name: username,
            })}
          >
            {t("modal.add_user_add_btn")}
          </Button>
        </div>
      </ModalWrapper>
      <AlertMessage
        message={t("alert.add_user_success")}
        type="success"
        isOpen={isOpenAlertSuccess}
        onClose={() => setOpenAlertSuccess(false)}
      />
      <AlertMessage
        message={t("alert.add_user_error")}
        type="error"
        isOpen={isOpenAlertError}
        onClose={() => setOpenAlertError(false)}
      />
    </>
  );
};
