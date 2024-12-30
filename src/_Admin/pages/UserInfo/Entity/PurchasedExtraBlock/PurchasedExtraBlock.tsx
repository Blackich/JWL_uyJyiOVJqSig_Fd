import "./PurchasedExtraBlock.css";
import { FC } from "react";
import { Link } from "react-router-dom";
import { User } from "@Admin/utils/types";
import { formatDate } from "@utils/utils";
import { userInfoApi } from "@Admin/pages/UserInfo/_userInfoApi";

type Props = {
  userInfo: User;
};

export const PurchasedExtraBlock: FC<Props> = ({ userInfo }) => {
  const { data: purchasedExtra } = userInfoApi.useGetExtraByUserIdQuery(
    Number(userInfo.id),
  );

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
            <Link
              to={`/panel/extra/${extra.id}`}
              key={extra.id}
              className="user-purchased-extra__item"
            >
              <p className="upe-nickname">{extra.nickname}</p>
              <p>{extra.extraServiceName}</p>
              <p>{extra.count}</p>
              <p className="upe-date">{formatDate(extra.createdAt)}</p>
            </Link>
          ))}
      </div>
    </div>
  );
};
