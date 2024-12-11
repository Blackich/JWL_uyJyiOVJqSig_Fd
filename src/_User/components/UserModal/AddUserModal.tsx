import "./AddUserModal.css";
import { FC, useState } from "react";
import { ModalWrapper } from "@ui/ModalWrapper/ModalWrapper";
import { Button } from "@ui/Button/Button";
import { PersonAddSVG } from "@User/utils/svg/HomeSvg";
import { Input } from "@ui/Input/Input";
import { userHomeApi } from "@User/pages/Home/_homeApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { AlertMessage } from "@ui/AlertMessage/AlertMessage";
import { useTranslation } from "react-i18next";
import { handlerErrorAxios } from "@utils/utils";
import { useAppSelector } from "@store/store";
import { getUserId } from "@User/auth/_user.slice";

type Props = {
  shownModal: boolean;
  onClose: VoidFunction;
};

export const AddUserModal: FC<Props> = ({ shownModal, onClose }) => {
  const { t } = useTranslation();
  const userId = useAppSelector(getUserId);

  const [username, setUsername] = useState<string>("");
  const [isOpenAlertSuccess, setOpenAlertSuccess] = useState<boolean>(false);
  const [isOpenAlertError, setOpenAlertError] = useState<boolean>(false);
  const [errExistsAcc, setErrExistsAcc] = useState<boolean>(false);
  const [errMaxAcc, setErrMaxAcc] = useState<boolean>(false);
  const [errMaxAllAcc, setErrMaxAllAcc] = useState<boolean>(false);

  const { refetch: updateSocialAccList } = userHomeApi.useGetSocialListQuery(
    userId || skipToken,
  );
  const [fetchAddInstAccount] = userHomeApi.useAddInstAccountMutation();

  const _onCloseClearInput = () => {
    onClose();
    setUsername("");
  };

  // validation add inst acc
  const handleAddInstUser = async () => {
    if (!userId || !username) return;
    await fetchAddInstAccount({ id: userId as number, username }).then(
      (res) => {
        if (res?.data) return setOpenAlertSuccess(true);
        if (res?.error) {
          const error = handlerErrorAxios(res?.error);
          if (error?.codeErr === 1) return setErrMaxAcc(true);
          if (error?.codeErr === 2) return setErrExistsAcc(true);
          if (error?.codeErr === 3) return setErrMaxAllAcc(true);
          return setOpenAlertError(true);
        }
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
      <AlertMessage
        message={t("alert.add_user_err_exist")}
        type="error"
        isOpen={errExistsAcc}
        onClose={() => setErrExistsAcc(false)}
      />
      <AlertMessage
        message={t("alert.add_user_err_max")}
        type="error"
        isOpen={errMaxAcc}
        onClose={() => setErrMaxAcc(false)}
      />
      <AlertMessage
        message={t("alert.add_user_err_max_all")}
        type="error"
        isOpen={errMaxAllAcc}
        onClose={() => setErrMaxAllAcc(false)}
      />
    </>
  );
};
