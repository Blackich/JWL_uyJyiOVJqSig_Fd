import "./PurchasedServicesBlock.css";
import { FC } from "react";
import { userInfoApi } from "@Admin/pages/UserInfo/_userInfoApi";
import { User } from "@Admin/utils/types";
import { formatDate } from "@/utils/utils";

type Props = {
  userInfo: User;
};

export const PurchasedServicesBlock: FC<Props> = ({ userInfo }) => {
  const { data: purchasedServices } =
    userInfoApi.useGetUserPurchasedServicesQuery(Number(userInfo.id));

  console.log(purchasedServices);

  return (
    <div className="main-block--user-purchased-services">
      <div className="user-purchased-services__list">
        <div id="user-th">
          <div id="user-td">Никнейм</div>
          <div id="user-td">Пакет</div>
          <div id="user-td">Кастомный</div>
          <div id="user-td">Постов</div>
          <div id="user-td">Статус</div>
          <div id="user-td">Создан</div>
          <div id="user-td">Цена</div>
          <div id="user-td">Валюта</div>
        </div>
        {userInfo &&
          purchasedServices &&
          purchasedServices.map((purchServ) => (
            <div key={purchServ.id} id="user-tr">
              <div id="user-td">{purchServ.nickname}</div>
              <div id="user-td">{purchServ.likes}</div>
              <div id="user-td">{purchServ.customPackage}</div>
              <div id="user-td">{purchServ.countPosts}</div>
              <div id="user-td">{purchServ.status}</div>
              <div id="user-td">{formatDate(purchServ.createdAt)}</div>
              <div id="user-td">{purchServ.cost}</div>
              <div id="user-td">{purchServ.currency}</div>
            </div>
          ))}
      </div>
    </div>
  );
};
