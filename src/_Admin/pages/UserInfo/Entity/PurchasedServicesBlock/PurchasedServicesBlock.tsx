import "./PurchasedServicesBlock.css";
import { FC } from "react";
import { User } from "@Admin/utils/types";
import { formatDate } from "@/utils/utils";
import { useNavigate } from "react-router-dom";
import { userInfoApi } from "@Admin/pages/UserInfo/_userInfoApi";

type Props = {
  userInfo: User;
};

export const PurchasedServicesBlock: FC<Props> = ({ userInfo }) => {
  const navigate = useNavigate();
  const { data: purchasedServices } = userInfoApi.useGetServicesByUserIdQuery(
    userInfo.id,
  );

  const handleClickToService = (idService: number) => {
    navigate(`/panel/services/${idService}`);
  };

  if (purchasedServices?.length === 0) {
    return (
      <div className="user-purchased-services">
        <div className="no-services-user">
          У пользователя нет купленных сервисов.
        </div>
      </div>
    );
  }

  return (
    <div className="user-purchased-services">
      <div className="user-purchased-services__list">
        {userInfo &&
          purchasedServices &&
          purchasedServices.map((service) => (
            <div
              key={service.id}
              className="user-purchased-services__item"
              onClick={() => handleClickToService(service.id)}
            >
              <p className="ups-nickname">{service.nickname}</p>
              {service.status === 1 ? (
                <p style={{ color: "green" }}>Active</p>
              ) : (
                <p style={{ color: "#c20000" }}>Inactive</p>
              )}
              <p className="ups-date">{formatDate(service.createdAt)}</p>
            </div>
          ))}
      </div>
    </div>
  );
};
