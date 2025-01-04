import "./PackageCard.css";
import { FC } from "react";
import { formatUSD, formatRUB } from "@utils/utils";
import { calcPrimeCostPackage } from "@Admin/utils/utils";
import { PackageDetails, PackageSettings } from "@Admin/utils/types";

type Props = {
  usdRub: number;
  indexButton: number;
  packageDetails: PackageDetails;
  packageSettings: PackageSettings[];
};

export const PackageCard: FC<Props> = ({
  indexButton,
  packageDetails,
  packageSettings,
  usdRub,
}) => {
  const primeCost = calcPrimeCostPackage(packageDetails.likes, packageSettings);
  return (
    <>
      <div className="package__item">
        <div className="package__title">Пакет {packageDetails.likes}</div>
        <div className="package__content">
          <p>{packageDetails.likes} Лайков</p>
          <p>{packageDetails.likes * 2} Охват + Показ</p>
          <p>
            {Math.round(packageDetails.likes * 0.075) < 100
              ? 100
              : Math.round(packageDetails.likes * 0.075)}{" "}
            Saves
          </p>
          <p>
            {Math.round(packageDetails.likes * 0.075) < 100
              ? 100
              : Math.round(packageDetails.likes * 0.075)}{" "}
            Auto Profile Visits
          </p>
          <p>
            {Math.round(packageDetails.likes * 0.075) < 100
              ? 100
              : Math.round(packageDetails.likes * 0.075)}{" "}
            Auto Shares
          </p>
          <p>{packageDetails.likes * 3} Просмотров видео</p>
        </div>
        <div className="package__price">
          <div className="package__price--fact-cost">
            <p className="package__price__title">
              Actual <br />
              cost
            </p>
            {indexButton === 1 ? (
              <>
                <p>{formatUSD(+(packageDetails.price_usd_15))}</p>
                <p>{formatRUB(+(packageDetails.price_rub_15))}</p>
              </>
            ) : (
              <>
                <p>{formatUSD(+(packageDetails.price_usd_30))}</p>
                <p>{formatRUB(+(packageDetails.price_rub_30))}</p>
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
