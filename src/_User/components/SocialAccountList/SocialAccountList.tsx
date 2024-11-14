import "./SocialAccountList.css";
import { FC, MouseEvent, useEffect, useState } from "react";
import { Button } from "@ui/Button/Button";
import { SocialAccount } from "@User/components/SocialAccount/SocialAccount";
import { DeleteUserModal } from "@User/components/UserModal/DeleteUserModal";
import { AddUserModal } from "@User/components/UserModal/AddUserModal";
import { userHomeApi } from "@User/pages/Home/_homeApi";
import { authUser } from "@User/auth/_authApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { AlertMessage } from "@ui/AlertMessage/AlertMessage";
import { useTranslation } from "react-i18next";

const handleClickGetCredentialUser = (e: MouseEvent<HTMLElement>) => {
  e.stopPropagation();
  const clickedUser = e.currentTarget.closest(
    ".social-account",
  ) as HTMLDivElement;
  if (!clickedUser) return;
  const user = clickedUser.dataset?.username;
  if (!user) return;
  return user;
};

type Props = {
  activeUserId: number;
  setActiveUserId: (id: number) => void;
};

export const SocialAccountList: FC<Props> = ({
  activeUserId,
  setActiveUserId,
}) => {
  const { t } = useTranslation();
  const [shownModalAddInst, setShownModalAddInst] = useState<boolean>(false);
  const [shownModalDeleteInst, setShownModalDeleteInst] =
    useState<boolean>(false);
  const [isOpenAlertSuccess, setOpenAlertSuccess] = useState<boolean>(false);
  const [isOpenAlertError, setOpenAlertError] = useState<boolean>(false);
  const [chosenName, setChosenName] = useState<string>("");

  const { data: userCred } = authUser.useCheckAuthUserQuery();
  const { data: userList, refetch: updateSocialAccList } =
    userHomeApi.useGetSocialListQuery((userCred?.id as number) || skipToken);
  const [fetchDeleteInstAccount] = userHomeApi.useDeleteInstAccountMutation();

  const handleClickTrash = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const user = handleClickGetCredentialUser(e);
    if (!user) return;
    setChosenName(user);
    setShownModalDeleteInst(true);
  };

  const _onCloseClearNameApproveModal = () => {
    setChosenName("");
    setShownModalDeleteInst(false);
  };

  const handleDeleteInstUser = async () => {
    await fetchDeleteInstAccount({
      id: userCred?.id as number,
      username: chosenName as string,
    }).then((res) => {
      if (res?.data) return setOpenAlertSuccess(true);
      if (res?.error) return setOpenAlertError(true);
    });
    updateSocialAccList();
    _onCloseClearNameApproveModal();
  };

  const handleClickProfile = (e: MouseEvent<HTMLDivElement>) => {
    const nickname = handleClickGetCredentialUser(e);
    const userId = userList?.find((user) => user.nickname === nickname)?.id;
    setActiveUserId(userId as number);
    localStorage.setItem("activeUserId", userId?.toFixed() as string);
  };

  useEffect(() => {
    if (!userList) return;
    if (userList?.length === 0) {
      localStorage.removeItem("activeUserId");
      return;
    };
    if (!localStorage.getItem("activeUserId")) {
      setActiveUserId(userList[0].id);
      localStorage.setItem("activeUserId", userList[0].id.toFixed());
    } else {
      setActiveUserId(Number(localStorage.getItem("activeUserId")));
    }
  }, [userList, setActiveUserId]);

  return (
    <>
      <div className="social-account-list">
        <Button
          onClick={() => setShownModalAddInst(true)}
          aria-label={t("social_account_list.add_account_aria")}
        >
          {t("social_account_list.add_account")}
        </Button>

        {userList ? (
          userList.length > 0 ? (
            userList.map((user) => (
              <SocialAccount
                key={user.id}
                activeUserId={activeUserId}
                userCred={user}
                handleClickTrash={handleClickTrash}
                handleClickProfile={handleClickProfile}
              />
            ))
          ) : (
            <div className="soc-acc-no-user">
              {t("social_account_list.no_user")}
            </div>
          )
        ) : (
          <div>loading</div>
        )}
      </div>
      <AddUserModal
        shownModal={shownModalAddInst}
        onClose={() => setShownModalAddInst(false)}
      />
      <DeleteUserModal
        username={chosenName}
        shownModal={shownModalDeleteInst}
        onClose={_onCloseClearNameApproveModal}
        handleDeleteInstUser={handleDeleteInstUser}
      />
      <AlertMessage
        message={t("alert.delete_user_success")}
        type="success"
        isOpen={isOpenAlertSuccess}
        onClose={() => setOpenAlertSuccess(false)}
      />
      <AlertMessage
        message={t("alert.delete_user_error")}
        type="error"
        isOpen={isOpenAlertError}
        onClose={() => setOpenAlertError(false)}
      />
    </>
  );
};
