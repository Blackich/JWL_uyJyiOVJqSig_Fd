import { FC } from "react";
import { t } from "i18next";
import { Input } from "@ui/Input/Input";
import { ExtraDetailsUser } from "@User/utils/types";

type Props = {
  count: number;
  serviceId: number;
  setCount: (count: number) => void;
  extraDetails?: ExtraDetailsUser[];
};

export const ExtraCount: FC<Props> = ({
  count,
  setCount,
  serviceId,
  extraDetails,
}) => {
  const minQuantity =
    extraDetails?.find((exDet) => exDet.extraServiceId === serviceId)
      ?.minQuantity || 100;
  return (
    <div className="input-info">
      <Input
        type="number"
        placeholder={t("extra_services.input_count")}
        value={count === 0 ? "" : count}
        onChange={(e) => {
          if (serviceId === 0) return;
          if (Number(e.target.value) > 100000) return;
          setCount(Number(e.target.value));
        }}
        onKeyDown={(e) => {
          const invalidChars = ["e", "E", "+", "-"];
          if (invalidChars.includes(e.key)) {
            e.preventDefault();
          }
        }}
      />
      <div className="input-info__text">
        {t("extra_services.min_count_warn")}: {minQuantity}
      </div>
    </div>
  );
};
