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
import { ExtraDetailsUser } from "@User/utils/types";
import {
  getSocialAccId,
  getSocialAccName,
  getUserId,
} from "@User/auth/_user.slice";

type Props = {
  selectItems: { ru: string[]; en: string[] };
  extraDetails?: ExtraDetailsUser[];
};

export const ExtraServices: FC<Props> = ({ selectItems, extraDetails }) => {
  const { t, i18n } = useTranslation();
  const userId = useAppSelector(getUserId);
  const pickedAccId = useAppSelector(getSocialAccId);
  const pickedAccName = useAppSelector(getSocialAccName);

  const [shownModalPayment, setShownModalPayment] = useState<boolean>(false);
  const [countComments, setCountComments] = useState<number>(0);
  const [processedLines, setProcessedLines] = useState<string[]>([]);
  const [serviceId, setServiceId] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  const [saveCommentsBeforePayment] =
    userExtraApi.useSaveCommentsBeforePaymentMutation();

  const handleLinesProcessed = (lines: string[]) => {
    setProcessedLines(lines);
  };

  const extraServDetails = extraDetails?.find(
    (exDet) => exDet.extraServiceId === serviceId,
  );

  const calcPrice = (currency: "RUB" | "USD") => {
    if (serviceId === 0) return 0;
    const rub = Number(extraServDetails?.price_rub_1k) || 0;
    const usd = Number(extraServDetails?.price_usd_1k) || 0;
    const cost = currency === "RUB" ? rub : usd;
    if (serviceId === 4) return (countComments / 1000) * cost || 0;
    return (count / 1000) * cost || 0;
  };

  const extraServiceMenuItems = (lang: string) =>
    extraDetails
      ?.map((exServ) => exServ.extraServiceId)
      .map((exServId) => {
        return {
          id: exServId,
          name: selectItems[lang as keyof typeof selectItems][exServId - 1],
        };
      });

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
    const minQuantity = extraServDetails?.minQuantity;

    if (!pickedAccName) return true;
    if (serviceId === 0) return true;
    if (serviceId === 4 && countComments < 10) return true;
    if (serviceId !== 4 && minQuantity && count < minQuantity) return true;
    return false;
  };

  const paymentModalData = {
    count,
    serviceId,
    selectItems,
    priceRUB: calcPrice("RUB"),
    priceUSD: calcPrice("USD"),
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
        menuItemArray={extraServiceMenuItems(i18n.language)}
      />

      {serviceId === 4 ? (
        <div style={{ height: "300px" }}>
          <InputComment
            count={countComments}
            setCount={setCountComments}
            onLinesProcessed={handleLinesProcessed}
            min={10}
          />
        </div>
      ) : (
        <ExtraCount
          count={count}
          setCount={setCount}
          serviceId={serviceId}
          extraDetails={extraDetails}
        />
      )}

      <Input
        disabled
        placeholder={t("extra_services.price")}
        value={
          i18n.language === "ru"
            ? formatRUB(calcPrice("RUB"))
            : formatUSD(calcPrice("USD"))
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
