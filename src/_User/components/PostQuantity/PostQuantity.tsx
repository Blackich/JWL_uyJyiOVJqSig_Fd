import "./PostQuantity.css";
import { FC } from "react";
import { Button } from "@ui/Button/Button";
import { useTranslation } from "react-i18next";

type Props = {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
};

export const PostQuantity: FC<Props> = ({ activeIndex, setActiveIndex }) => {
  const { t } = useTranslation();
  const handleChangeQuantity = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="post-quantity">
      <Button
        style={{ width: "150px" }}
        onClick={() => handleChangeQuantity(1)}
        className={`${activeIndex === 1 ? "active" : ""}`}
        aria-label={t("card_list.post_quantity_btn_change_aria", {
          count: 15,
        })}
      >
        15 {t("card_list.post_quantity_btn_change")}
      </Button>
      <Button
        style={{ width: "150px" }}
        onClick={() => handleChangeQuantity(2)}
        className={`${activeIndex === 2 ? "active" : ""}`}
        aria-label={t("card_list.post_quantity_btn_change_aria", {
          count: 30,
        })}
      >
        30 {t("card_list.post_quantity_btn_change")}
      </Button>
    </div>
  );
};
