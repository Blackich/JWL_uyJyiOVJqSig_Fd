import "./ServiceInfo.css";
import { FC, useState } from "react";
import { Timer } from "@User/utils/types";
import Countdown, { zeroPad } from "react-countdown";
import { Service } from "@Admin/utils/types";
import { DropdownBtn } from "@ui/Dropdown/DropdownBtn";
import { AlertMessage } from "@ui/AlertMessage/AlertMessage";
import { serviceApi } from "@Admin/pages/Service/_serviceApi";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  formatDate,
  formatRUB,
  formatUSD,
  pluralize,
  remainingTime,
} from "@/utils/utils";

const renderTimer = ({ days, hours, minutes, seconds }: Timer) => (
  <>
    {days} {pluralize(Number(zeroPad(days)), ["день", "дня", "дней"])}{" "}
    {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
  </>
);

type Props = {
  service: Service;
  refetchService: VoidFunction;
  setShownModalCancelSubs: (shown: boolean) => void;
};

export const ServiceInfo: FC<Props> = ({
  service,
  refetchService,
  setShownModalCancelSubs,
}) => {
  const [isOpenAlertSuccess, setOpenAlertSuccess] = useState<boolean>(false);
  const [updateServiceStatus] = serviceApi.useUpdateServiceStatusMutation();

  const onClickActiveStatus = async () => {
    if (service.status === 1) return;
    await updateServiceStatus(Number(service.id));
    refetchService();
  };

  const onClickInactiveStatus = async () => {
    if (service.status === 0) return;
    await updateServiceStatus(Number(service.id));
    refetchService();
  };

  return (
    <div className="service-info">
      <span>
        Пользователь:&nbsp;<p>{service.userId}</p>
      </span>
      <span>
        Приглашен:&nbsp;<p>{service.fullName}</p>
      </span>
      <span>
        Аккаунт:&nbsp;<p>{service.nickname}</p>
      </span>
      {service.packageLikes ? (
        <span>
          Пакет:&nbsp;<p>{service.packageLikes}</p>
        </span>
      ) : (
        <span>
          Пакет&nbsp;<div style={{ fontStyle: "italic" }}>(кастомный):</div>
          &nbsp;<p>{service.customLikes}</p>
        </span>
      )}
      <span>
        Постов:&nbsp;<p>{service.countPosts}</p>
      </span>
      <span>
        Стоимость:&nbsp;
        <p>
          {service.currency === "RUB"
            ? formatRUB(service.cost)
            : formatUSD(service.cost)}
        </p>
      </span>
      <span>
        Куплен:&nbsp;<p>{formatDate(service.createdAt)}</p>
      </span>
      <span>
        Осталось:&nbsp;
        <p>
          <Countdown
            date={Date.now() + remainingTime(service.createdAt)}
            renderer={renderTimer}
          />
        </p>
      </span>
      <span>
        {service.status === 1 ? (
          <>
            Статус:&nbsp;<p style={{ color: "green" }}>active</p>
          </>
        ) : (
          <>
            Статус:&nbsp;<p style={{ color: "red" }}>inactive</p>
          </>
        )}
        <DropdownBtn
          className="service-info__dropdown"
          menuItemArray={["active", "inactive"]}
          menuItemOnClick={[onClickActiveStatus, onClickInactiveStatus]}
        />
      </span>
      <span>
        orderId:&nbsp;<p>{service.orderId}</p>
        <div
          className="service-info__copy"
          onClick={() => {
            navigator.clipboard.writeText(service.orderId);
            setOpenAlertSuccess(true);
          }}
        >
          <ContentCopyOutlinedIcon />
        </div>
      </span>
      <span>
        Warn:&nbsp;<p style={{ color: "#c20000" }}>Остановить все подписки?</p>
        <div
          className="service-info__cancel-subs"
          onClick={() => setShownModalCancelSubs(true)}
        >
          <DeleteOutlineOutlinedIcon />
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
