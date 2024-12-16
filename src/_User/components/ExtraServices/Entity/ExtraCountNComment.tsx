import { FC } from "react";
import { t } from "i18next";
import { Input } from "@ui/Input/Input";

type Props = {
  count: number;
  setCount: (count: number) => void;
  serviceId: number;
};

export const ExtraCountNComment: FC<Props> = ({
  count,
  setCount,
  serviceId,
}) => {
  return (
    <div className="input-info">
      <Input
        type="number"
        placeholder={t("extra_services.input_count")}
        value={count === 0 ? "" : count}
        onChange={(e) => {
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
        {t("extra_services.min_count_warn")}:{" "}
        {minQuantity[serviceId as keyof typeof minQuantity]}
      </div>
    </div>
  );
};

const minQuantity = {
  0: 100,
  1: 500,
  2: 100,
  3: 10,
};
