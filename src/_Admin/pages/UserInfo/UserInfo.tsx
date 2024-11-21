import "./UserInfo.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { MainBlock } from "@Admin/components/MainBlock/MainBlock";
import { userInfoApi } from "@Admin/pages/UserInfo/_userInfoApi";
import { usersListApi } from "@Admin/pages/UsersList/_usersListApi";
import { RemarkModal } from "./Entity/RemarkModal/RemarkModal";
import { UserCredentialsBlock } from "./Entity/UserCredentialsBlock/UserCredentialsBlock";
import { SocialAccountBlock } from "./Entity/SocialAccountBlock/SocialAccountBlock";
import { CustomPackPresence } from "./Entity/CustomPackPresence/CustomPackPresence";

export const UserInfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [shownModalRemark, setModalRemarkShow] = useState(false);
  const { data: userInfo, refetch: refetchUserInfo } =
    userInfoApi.useGetUserInfoQuery(Number(id));
  const invaldateUsersTable = () =>
    dispatch(usersListApi.util.invalidateTags(["UserList"]));

  return (
    <MainBlock title={`Пользователь ${id}`}>
      <div className="main-block--user-info">
        {userInfo && (
          <>
            <UserCredentialsBlock
              userInfo={userInfo}
              refetchUserInfo={refetchUserInfo}
              invaldateUsersTable={invaldateUsersTable}
              setModalRemarkShow={setModalRemarkShow}
            />
            <SocialAccountBlock userInfo={userInfo} />
            <CustomPackPresence userInfo={userInfo} />
          </>
        )}
      </div>

      {userInfo && (
        <RemarkModal
          shownModal={shownModalRemark}
          onClose={() => setModalRemarkShow(false)}
          remarkData={userInfo.remark}
          userId={userInfo.id}
          refetchUserInfo={refetchUserInfo}
          invalidateUsers={invaldateUsersTable}
        />
      )}
    </MainBlock>
  );
};
