import "./PurchasedExtraBlock.css";
import { FC } from "react";
import { User } from "@Admin/utils/types";
import { formatDate } from "@utils/utils";
import { useNavigate } from "react-router-dom";
import { userInfoApi } from "@Admin/pages/UserInfo/_userInfoApi";

type Props = {
  userInfo: User;
};

export const PurchasedExtraBlock: FC<Props> = ({ userInfo }) => {
  const navigate = useNavigate();
  const { data: purchasedExtra } = userInfoApi.useGetExtraByUserIdQuery(
    Number(userInfo.id),
  );

  const handleClickToExtra = (extraId: number) => {
    navigate(`/panel/extra/${extraId}`);
  };

  if (purchasedExtra && purchasedExtra?.length === 0) {
    return (
      <div className="user-info__block">
        <div className="user-info__no-service">
          У пользователя нет купленных дополнительных услуг.
        </div>
      </div>
    );
  }

  return (
    <div className="user-purchased-extra user-info__block">
      <div className="user-purchased-extra__list">
        {purchasedExtra &&
          purchasedExtra.map((extra) => (
            <div
              key={extra.id}
              className="user-purchased-extra__item"
              onClick={() => handleClickToExtra(extra.id)}
            >
              <p className="upe-nickname">{extra.nickname}</p>
              <p>{extra.extraServiceName}</p>
              <p>{extra.count}</p>
              <p className="upe-date">{formatDate(extra.createdAt)}</p>
            </div>
          ))}
      </div>
    </div>
  );
};
