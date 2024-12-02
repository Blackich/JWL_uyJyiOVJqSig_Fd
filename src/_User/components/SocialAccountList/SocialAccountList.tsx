import "./SocialAccountList.css";
import { FC, MouseEvent, useEffect, useState } from "react";
import { Button } from "@ui/Button/Button";
import { DeleteUserModal } from "@User/components/UserModal/DeleteUserModal";
import { AddUserModal } from "@User/components/UserModal/AddUserModal";
import { userHomeApi } from "@User/pages/Home/_homeApi";
import { authUser } from "@User/auth/_authApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { AlertMessage } from "@ui/AlertMessage/AlertMessage";
import { useTranslation } from "react-i18next";
import {
  SkeletonSocialAccount,
  SocialAccount,
} from "@User/components/SocialAccount/SocialAccount";

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
    userHomeApi.useGetSocialListQuery(userCred?.id || skipToken);
  const [fetchDeleteInstAccount] = userHomeApi.useDeleteInstAccountMutation();
  const { data: activeServices } = userHomeApi.useGetActiveServiceQuery(
    userCred?.id || skipToken,
  );

  const handleClickTrash = (
    e: MouseEvent<HTMLButtonElement>,
    socAccName: string,
  ) => {
    e.stopPropagation();
    setChosenName(socAccName);
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

  const handleClickProfile = (socAccId: number) => {
    setActiveUserId(socAccId);
    localStorage.setItem("activeUserId", socAccId?.toFixed() as string);
  };

  const validateLS =
    localStorage.getItem("activeUserId") &&
    userList?.find(
      (user) => user.id === Number(localStorage.getItem("activeUserId")),
    );

  useEffect(() => {
    if (!userList) return;
    if (userList?.length === 0) {
      localStorage.removeItem("activeUserId");
      return;
    }
    if (!validateLS) {
      setActiveUserId(userList[0].id);
      localStorage.setItem("activeUserId", userList[0].id.toFixed());
    }
    if (!localStorage.getItem("activeUserId")) {
      setActiveUserId(userList[0].id);
      localStorage.setItem("activeUserId", userList[0].id.toFixed());
    } else {
      setActiveUserId(Number(localStorage.getItem("activeUserId")));
    }
  }, [userList, setActiveUserId, validateLS]);

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
            userList.map((user, i) => (
              <SocialAccount
                key={user.id}
                activeUserId={activeUserId}
                socialAcc={user}
                handleClickTrash={handleClickTrash}
                handleClickProfile={handleClickProfile}
                avatarColor={avatarColor[i]}
                photoId={i + 1}
              />
            ))
          ) : (
            <div className="soc-acc-no-user">
              {t("social_account_list.no_user")}
            </div>
          )
        ) : (
          <>
            <SkeletonSocialAccount />
            <SkeletonSocialAccount />
            <SkeletonSocialAccount />
          </>
        )}
      </div>
      <AddUserModal
        shownModal={shownModalAddInst}
        onClose={() => setShownModalAddInst(false)}
      />
      <DeleteUserModal
        username={chosenName}
        userList={userList}
        activeServices={activeServices}
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

const avatarColor = [
  {
    bg: "#e5ebff",
    person: "#4294ff",
  },
  { bg: "#58ce4f", person: "#d6ffd6" },
  { bg: "#42ecff", person: "#e5fcff" },
  {
    bg: "#ff6c6c",
    person: "#ffe5e5",
  },
  {
    bg: "#e3ed5b",
    person: "#f8faeb",
  },
];
