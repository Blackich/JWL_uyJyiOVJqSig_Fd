import "./ExtraServices.css";
import { FC, useState } from "react";
import { Input } from "@ui/Input/Input";
import { Button } from "@ui/Button/Button";
import { useAppSelector } from "@store/store";
import { useTranslation } from "react-i18next";
import { formatRUB, formatUSD } from "@utils/utils";
import { getSocialAccName } from "@User/auth/_user.slice";
import { DropdownSelect } from "@ui/Dropdown/DropdownSelect";
import { PaymentModal } from "@User/components/PaymentModal/PaymentModal";
import { ExtraCountNComment } from "./Entity/ExtraCountNComment";
import { ExtraInfo } from "./Entity/ExtraInfo";

type Props = {
  selectItems: { ru: string[]; en: string[] };
};

export const ExtraServices: FC<Props> = ({ selectItems }) => {
  const { t, i18n } = useTranslation();
  const pickedAccName = useAppSelector(getSocialAccName);

  const [shownModalPayment, setShownModalPayment] = useState<boolean>(false);
  const [serviceId, setServiceId] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const price =
    (count / 1000) *
    (priceTable[`${serviceId}` as unknown as keyof typeof priceTable] || 0);

  const paymentModalData = {
    count,
    serviceId,
    selectItems,
    priceRUB: +(price * 108).toFixed(0),
    priceUSD: +price.toFixed(2),
  };

  return (
    <div className="extra-services__wrapper">
      <Input
        disabled
        placeholder={t("extra-services.account")}
        defaultValue={pickedAccName || ""}
      />
      <DropdownSelect
        itemId={serviceId}
        setChosenItemId={setServiceId}
        label={t("extra_services.select_label")}
        menuItemArray={i18n.language === "ru" ? selectItems.ru : selectItems.en}
      />

      <ExtraCountNComment
        count={count}
        setCount={setCount}
        serviceId={serviceId}
      />

      <Input
        disabled
        placeholder={t("extra_services.price")}
        value={
          i18n.language === "ru" ? formatRUB(price * 108) : formatUSD(price)
        }
      />

      <ExtraInfo serviceId={serviceId} />

      <Button
        className="extra-services__btn"
        disabled={count < 500 || serviceId === 0}
        onClick={() => {
          setShownModalPayment(true);
        }}
      >
        {t("extra_services.purchase_btn")}
      </Button>
      <PaymentModal
        shownModal={shownModalPayment}
        onClose={() => setShownModalPayment(false)}
        modalId={1}
        modalData={paymentModalData}
      />
    </div>
  );
};

const priceTable = {
  1: 1.4,
  2: 2.4,
  3: 3.4,
};
