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
  remark?: string;
  refetchUserInfo: VoidFunction;
  setModalRemarkShow: (shown: boolean) => void;
};

export const UserCredentialsBlock: FC<Props> = ({
  userInfo,
  remark,
  refetchUserInfo,
  setModalRemarkShow,
}) => {
  const [isOpenAlertCopy, setOpenAlertCopy] = useState<boolean>(false);
  const [updateUserStatus] = userInfoApi.useUpdateUserStatusMutation();

  const onClickActiveStatus = async () => {
    if (userInfo?.status === 1) return;
    await updateUserStatus(Number(userInfo.id));
    refetchUserInfo();
  };

  const onClickInactiveStatus = async () => {
    if (userInfo?.status === 0) return;
    await updateUserStatus(Number(userInfo.id));
    refetchUserInfo();
  };

  const onClickChangeRemark = () => {
    setModalRemarkShow(true);
  };

  return (
    <div className="user-credentials">
      <span>
        Email:&nbsp;<p>{userInfo.email}</p>
        <div
          className="copy-btn"
          onClick={() => {
            navigator.clipboard.writeText(userInfo.email);
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
        Статус:&nbsp;
        {userInfo.status === 1 ? (
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
        Примечание:&nbsp;<p>{remark}</p>
        <DropdownBtn
          className="user-credentials__dropdown"
          menuItemArray={["Изменить"]}
          menuItemOnClick={[onClickChangeRemark]}
        />
      </span>
      <AlertMessage
        type="success"
        message="Email скопирован в буфер обмена"
        isOpen={isOpenAlertCopy}
        onClose={() => setOpenAlertCopy(false)}
      />
    </div>
  );
};
