import "./ExtraInfo.css";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExtraInfoAdminSide } from "@Admin/utils/types";
import { AlertMessage } from "@ui/AlertMessage/AlertMessage";
import { formatDateNTime, formatRUB, formatUSD } from "@/utils/utils";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";

type Props = {
  extra: ExtraInfoAdminSide;
};

export const ExtraInfo: FC<Props> = ({ extra }) => {
  const navigate = useNavigate();
  const [isOpenAlertSuccess, setOpenAlertSuccess] = useState<boolean>(false);

  const handleClickToUser = () => {
    navigate(`/panel/users/${extra.userId}`);
  };

  return (
    <div className="extra-service-info">
      <span onClick={handleClickToUser} className="service-info__user-link">
        Пользователь:&nbsp;<p>{extra.userId}</p>
      </span>
      <span>
        Приглашен:&nbsp;<p>{extra.invitedName}</p>
      </span>
      <span>
        Аккаунт:&nbsp;<p>{extra.nickname}</p>
      </span>
      <span>
        Услуга:&nbsp;<p>{extra.extraServiceName}</p>
      </span>
      <span>
        Количество:&nbsp;<p>{extra.count}</p>
      </span>
      <span>
        Стоимость:&nbsp;
        <p>
          {formatRUB(Number(extra.priceRUB))} /{" "}
          {formatUSD(Number(extra.priceUSD))}
        </p>
      </span>
      <span>
        Куплен:&nbsp;<p>{formatDateNTime(extra.createdAt)}</p>
      </span>
      <span>
        Оплачен:&nbsp;<p>{extra.paymentServiceName}</p>
      </span>
      <span>
        orderId:&nbsp;<p>{extra.paymentOrderId}</p>
        <div
          className="copy-btn"
          onClick={() => {
            navigator.clipboard.writeText(extra.paymentOrderId);
            setOpenAlertSuccess(true);
          }}
        >
          <ContentCopyOutlinedIcon />
        </div>
      </span>
      <AlertMessage
        type="success"
        message="orderId скопирован в буфер обмена"
        isOpen={isOpenAlertSuccess}
        onClose={() => setOpenAlertSuccess(false)}
      />
    </div>
  );
};
