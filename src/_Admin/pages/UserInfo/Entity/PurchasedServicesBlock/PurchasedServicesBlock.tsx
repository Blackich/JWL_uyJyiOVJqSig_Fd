import "./PurchasedServicesBlock.css";
import { FC } from "react";
import { Link } from "react-router-dom";
import { User } from "@Admin/utils/types";
import { formatDate } from "@utils/utils";
import { userInfoApi } from "@Admin/pages/UserInfo/_userInfoApi";

type Props = {
  userInfo: User;
};

export const PurchasedServicesBlock: FC<Props> = ({ userInfo }) => {
  const { data: purchasedServices } = userInfoApi.useGetServicesByUserIdQuery(
    userInfo.id,
  );

  if (purchasedServices?.length === 0) {
    return (
      <div className="user-info__block">
        <div className="user-info__no-service">
          У пользователя нет купленных пакетов.
        </div>
      </div>
    );
  }

  return (
    <div className="user-purchased-services user-info__block">
      <div className="user-purchased-services__list">
        {purchasedServices &&
          purchasedServices.map((service) => (
            <Link
              to={`/panel/services/${service.id}`}
              key={service.id}
              className="user-purchased-services__item"
            >
              <p className="ups-nickname">{service.nickname}</p>
              {service.status === 1 ? (
                <p style={{ color: "green" }}>Active</p>
              ) : (
                <p style={{ color: "#c20000" }}>Inactive</p>
              )}
              <p className="ups-date">{formatDate(service.createdAt)}</p>
            </Link>
          ))}
      </div>
    </div>
  );
};
