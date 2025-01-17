import "./UserInfo.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { RemarkModal } from "./Entity/RemarkModal/RemarkModal";
import { userInfoApi } from "@Admin/pages/UserInfo/_userInfoApi";
import { MainBlock } from "@Admin/components/MainBlock/MainBlock";
import { CustomPackPresence } from "./Entity/CustomPackPresence/CustomPackPresence";
import { SocialAccountBlock } from "./Entity/SocialAccountBlock/SocialAccountBlock";
import { PurchasedExtraBlock } from "./Entity/PurchasedExtraBlock/PurchasedExtraBlock";
import { UserCredentialsBlock } from "./Entity/UserCredentialsBlock/UserCredentialsBlock";
import { PurchasedServicesBlock } from "./Entity/PurchasedServicesBlock/PurchasedServicesBlock";

export const UserInfo = () => {
  const { id } = useParams();

  const [shownModalRemark, setModalRemarkShow] = useState(false);

  const { data: userInfo, refetch: refetchUserInfo } =
    userInfoApi.useGetUserInfoQuery(Number(id));
  const { data: remark, refetch: refetchUserRemark } =
    userInfoApi.useGetRemarkByUserIdQuery(Number(id));

  return (
    <MainBlock title={`Пользователь ${id}`}>
      <div className="main-block--user-info">
        {userInfo && (
          <>
            <UserCredentialsBlock
              userInfo={userInfo}
              remark={remark}
              refetchUserInfo={refetchUserInfo}
              setModalRemarkShow={setModalRemarkShow}
            />
            <SocialAccountBlock userInfo={userInfo} />
            <PurchasedServicesBlock userInfo={userInfo} />
            <CustomPackPresence userInfo={userInfo} />
            <PurchasedExtraBlock userInfo={userInfo} />
          </>
        )}
      </div>

      {userInfo && (
        <RemarkModal
          shownModal={shownModalRemark}
          onClose={() => setModalRemarkShow(false)}
          remarkData={remark}
          userId={userInfo.id}
          refetchUserRemark={refetchUserRemark}
        />
      )}
    </MainBlock>
  );
};
