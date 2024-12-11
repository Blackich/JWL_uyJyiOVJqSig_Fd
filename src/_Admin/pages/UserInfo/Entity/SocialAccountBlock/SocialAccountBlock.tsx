import "./SocialAccountBlock.css";
import { FC } from "react";
import { User } from "@Admin/utils/types";
import { userInfoApi } from "@Admin/pages/UserInfo/_userInfoApi";
import { formatDate } from "@utils/utils";
import { InstagramSVG, TelegramSVG } from "@Admin/utils/svg/UserUnfoSvg";

type Props = {
  userInfo: User;
};

export const SocialAccountBlock: FC<Props> = ({ userInfo }) => {
  const { data: socialAccounts } = userInfoApi.useGetUserSocialAccountsQuery(
    Number(userInfo.id),
  );

  if (socialAccounts?.length === 0) {
    return (
      <div className="user-social-accounts">
        <div className="user-soc-acc__no-acc">
          Пользователь не добавил ни одного аккаунта.
        </div>
      </div>
    );
  }

  return (
    <div className="user-social-accounts">
      <div className="user-soc-acc__list">
        {userInfo &&
          socialAccounts &&
          socialAccounts.map((socAcc) => (
            <div key={socAcc.id} className="user-soc-acc__item">
              {socAcc.messangerId === 1 ? <InstagramSVG /> : <TelegramSVG />}
              <p style={{ color: socAcc.status === 0 ? "#c20000" : "#000" }}>
                {socAcc.nickname}
              </p>
              <p className="user-soc-acc__item-date">
                {formatDate(socAcc.createdAt)}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};
