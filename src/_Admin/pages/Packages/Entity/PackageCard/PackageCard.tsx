import "./PackageCard.css";
import { FC } from "react";
import { formatUSD, formatRUB } from "@/utils/utils";

type Props = {
  likes: number;
  indexButton: number;
  actCostRUB15: number;
  actCostRUB30: number;
  actCostUSD15: number;
  actCostUSD30: number;
  primeCost: number;
  usdRub: number;
};

export const PackageCard: FC<Props> = ({
  likes,
  indexButton,
  actCostRUB15,
  actCostRUB30,
  actCostUSD15,
  actCostUSD30,
  primeCost,
  usdRub = 1,
}) => {
  return (
    <>
      <div className="package__item">
        <div className="package__title">Пакет {likes}</div>
        <div className="package__content">
          <p>{likes} Лайков</p>
          <p>{likes * 2} Охват + Показ</p>
          <p>
            {Math.round(likes * 0.075) < 100 ? 100 : Math.round(likes * 0.075)}{" "}
            Saves
          </p>
          <p>
            {Math.round(likes * 0.075) < 100 ? 100 : Math.round(likes * 0.075)}{" "}
            Auto Profile Visits
          </p>
          <p>
            {Math.round(likes * 0.075) < 100 ? 100 : Math.round(likes * 0.075)}{" "}
            Auto Shares
          </p>
          <p>{likes * 3} Просмотров видео</p>
        </div>
        <div className="package__price">
          <div className="package__price--fact-cost">
            <p className="package__price__title">
              Actual <br />
              cost
            </p>
            {indexButton === 1 ? (
              <>
                <p>{formatUSD(actCostUSD15)}</p>
                <p>{formatRUB(actCostRUB15)}</p>
              </>
            ) : (
              <>
                <p>{formatUSD(actCostUSD30)}</p>
                <p>{formatRUB(actCostRUB30)}</p>
              </>
            )}
          </div>
          <div className="package__price--prime-cost">
            <p className="package__price__title">
              Prime
              <br />
              cost
            </p>
            {indexButton === 1 ? (
              <>
                <p>{formatUSD(primeCost)}</p>
                <p>{formatRUB(primeCost * usdRub)}</p>
              </>
            ) : (
              <>
                <p>{formatUSD(primeCost * 2)}</p>
                <p>{formatRUB(primeCost * usdRub * 2)}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
