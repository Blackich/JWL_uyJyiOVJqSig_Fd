import "./UserCredentialsBlock.css";
import { FC } from "react";
import { userInfoApi } from "@Admin/pages/UserInfo/_userInfoApi";
import { DropdownBtn } from "@ui/Dropdown/DropdownBtn";
import { formatDate } from "@/utils/utils";
import { User } from "@Admin/utils/types";

type Props = {
  userInfo: User;
  refetchUserInfo: VoidFunction;
  invaldateUsersTable: VoidFunction;
  setModalRemarkShow: (shown: boolean) => void;
};

export const UserCredentialsBlock: FC<Props> = ({
  userInfo,
  refetchUserInfo,
  invaldateUsersTable,
  setModalRemarkShow,
}) => {
  const [updateUserStatus] = userInfoApi.useUpdateUserStatusMutation();

  const onClickActiveStatus = async () => {
    if (userInfo?.status === "active") return;
    await updateUserStatus(Number(userInfo.id));
    refetchUserInfo();
    invaldateUsersTable();
  };

  const onClickInactiveStatus = async () => {
    if (userInfo?.status === "inactive") return;
    await updateUserStatus(Number(userInfo.id));
    refetchUserInfo();
    invaldateUsersTable();
  };

  const onClickChangeRemark = () => {
    setModalRemarkShow(true);
  };

  return (
    <div className="main-block--user-credentials">
      <span>
        Token:&nbsp;<p>{userInfo.token}</p>
      </span>
      <span>
        Создан:&nbsp;<p>{formatDate(userInfo.createdAt)}</p>
      </span>
      <span>
        Приглашен:&nbsp;<p>{userInfo.fullName}</p>
      </span>
      <span>
        Статус:&nbsp;
        <p>{userInfo.status}</p>
        <DropdownBtn
          className="user-credentials__dropdown"
          menuItemArray={["active", "inactive"]}
          menuItemOnClick={[onClickActiveStatus, onClickInactiveStatus]}
        />
      </span>
      <span>
        Примечание:&nbsp;<p>{userInfo.remark}</p>
        <DropdownBtn
          className="user-credentials__dropdown"
          menuItemArray={["Изменить"]}
          menuItemOnClick={[onClickChangeRemark]}
        />
      </span>
    </div>
  );
};
