import "./ExtraServices.css";
import { FC, useState } from "react";
import { Input } from "@ui/Input/Input";
import { Button } from "@ui/Button/Button";
import { useAppSelector } from "@store/store";
import { useTranslation } from "react-i18next";
import { formatRUB, formatUSD } from "@utils/utils";
import { DropdownSelect } from "@ui/Dropdown/DropdownSelect";
import { PaymentModal } from "@User/components/PaymentModal/PaymentModal";
import { ExtraCount } from "./Entity/ExtraCount";
import { ExtraInfo } from "./Entity/ExtraInfo";
import { InputComment } from "@ui/InputComment/InputComment";
import { userExtraApi } from "@User/pages/Extra/_extraApi";
import {
  getSocialAccId,
  getSocialAccName,
  getUserId,
} from "@User/auth/_user.slice";

type Props = {
  selectItems: { ru: string[]; en: string[] };
};

export const ExtraServices: FC<Props> = ({ selectItems }) => {
  const { t, i18n } = useTranslation();
  const userId = useAppSelector(getUserId);
  const pickedAccId = useAppSelector(getSocialAccId);
  const pickedAccName = useAppSelector(getSocialAccName);

  const [shownModalPayment, setShownModalPayment] = useState<boolean>(false);
  const [countComments, setCountComments] = useState<number>(0);
  const [processedLines, setProcessedLines] = useState<string[]>([]);
  const [serviceId, setServiceId] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const price =
    serviceId === 4
      ? (countComments / 10) *
        (priceTable[serviceId as keyof typeof priceTable] || 0)
      : (count / 1000) *
        (priceTable[serviceId as keyof typeof priceTable] || 0);

  const [saveCommentsBeforePayment] =
    userExtraApi.useSaveCommentsBeforePaymentMutation();

  const handleLinesProcessed = (lines: string[]) => {
    setProcessedLines(lines);
  };

  const onClickPaymentBtn = async () => {
    if (serviceId === 4 && countComments >= 1) {
      if (!userId || !pickedAccId) return;
      await saveCommentsBeforePayment({
        userId,
        countComments,
        comments: processedLines,
        socialNicknameId: pickedAccId,
      });
    }
    setShownModalPayment(true);
  };

  const isDisabledBtnCondition = (): boolean => {
    if (!pickedAccName) return true;
    if (serviceId === 0) return true;
    if (serviceId === 4 && countComments < 10) return true;
    if (
      serviceId !== 4 &&
      count < minQuantity[serviceId as keyof typeof minQuantity]
    )
      return true;
    return false;
  };

  const paymentModalData = {
    count,
    serviceId,
    selectItems,
    priceRUB: +(price * 108).toFixed(0),
    priceUSD: +price.toFixed(2),
    countComments,
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

      {serviceId === 4 ? (
        <InputComment
          count={countComments}
          setCount={setCountComments}
          onLinesProcessed={handleLinesProcessed}
          min={10}
        />
      ) : (
        <ExtraCount
          count={count}
          setCount={setCount}
          serviceId={serviceId}
          minQuantity={minQuantity}
        />
      )}

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
        disabled={isDisabledBtnCondition()}
        onClick={onClickPaymentBtn}
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

const minQuantity = {
  0: 100,
  1: 500,
  2: 100,
  3: 10,
  4: 10,
};

const priceTable = {
  1: 1.4,
  2: 2.4,
  3: 3.4,
  4: 12,
};
