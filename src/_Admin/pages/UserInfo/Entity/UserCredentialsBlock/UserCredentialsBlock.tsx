import "./UserCredentialsBlock.css";
import { FC, useState } from "react";
import { userInfoApi } from "@Admin/pages/UserInfo/_userInfoApi";
import { DropdownBtn } from "@ui/Dropdown/DropdownBtn";
import { formatDateNTime } from "@utils/utils";
import { User } from "@Admin/utils/types";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import { AlertMessage } from "@ui/AlertMessage/AlertMessage";

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
  const [isOpenAlertCopy, setOpenAlertCopy] = useState<boolean>(false);
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
    <div className="user-credentials">
      <span>
        Token:&nbsp;<p>{userInfo.token}</p>
        <div
          className="copy-btn"
          onClick={() => {
            navigator.clipboard.writeText(userInfo.token);
            setOpenAlertCopy(true);
          }}
        >
          <ContentCopyOutlinedIcon />
        </div>
      </span>

      <span>
        Создан:&nbsp;<p>{formatDateNTime(userInfo.createdAt)}</p>
      </span>
      <span>
        Приглашен:&nbsp;<p>{userInfo.fullName}</p>
      </span>
      <span>
        Статус:&nbsp;
        {userInfo.status === "active" ? (
          <>
            <p style={{ color: "green" }}>active</p>
          </>
        ) : (
          <>
            <p style={{ color: "#c20000" }}>inactive</p>
          </>
        )}
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
      <AlertMessage
        type="success"
        message="Token скопирован в буфер обмена"
        isOpen={isOpenAlertCopy}
        onClose={() => setOpenAlertCopy(false)}
      />
    </div>
  );
};
