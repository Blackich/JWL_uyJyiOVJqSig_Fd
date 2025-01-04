import "./ExtraCard.css";
import { siteNameById } from "@Admin/utils/utils";
import { formatRUB, formatUSD } from "@utils/utils";
import { extraDetailsApi } from "@Admin/pages/ExtraDetails/_extraDetails";
import { packageApi } from "@Admin/pages/PackageDetails/_packageDetailsApi";

export const ExtraCard = () => {
  const { data: extraDetails } = extraDetailsApi.useGetExtraDeatailsQuery();
  const { data: extraSettings } = extraDetailsApi.useGetExtraSettingsQuery();
  const { data: exchangeRate } = packageApi.useGetExchangeRateQuery();

  const extraAdjustments = extraSettings?.map((extra) => {
    const details = extraDetails?.find(
      (el) => el.extraServiceId === extra.extraServiceId,
    );
    return {
      id: extra.id,
      serviceName: details?.serviceName,
      price_usd_1k: Number(details?.price_usd_1k),
      price_rub_1k: Number(details?.price_rub_1k),
      siteId: extra.siteId,
      siteServiceId: extra.serviceId,
      primeCost: Number(extra.cost),
    };
  });

  return (
    extraAdjustments &&
    exchangeRate &&
    extraAdjustments.map((extra) => (
      <div className="extra-details__item" key={extra.id}>
        <div className="extra-details__title">{extra.serviceName}</div>
        <div className="extra-details__site">
          {siteNameById[extra.siteId as keyof typeof siteNameById]} -{" "}
          {extra.siteServiceId}
        </div>
        <div className="extra-details__price">
          <div className="extra-details-price__fact-cost">
            <p className="extra-details-price__title">
              Actual <br />
              cost
            </p>
            <p>{formatUSD(Number(extra.price_usd_1k))}</p>
            <p>{formatRUB(Number(extra.price_rub_1k))}</p>
          </div>
          <div className="extra-details-price__prime-cost">
            <p className="extra-details-price__title">
              Prime
              <br />
              cost
            </p>
            <p>{formatUSD(extra.primeCost)}</p>
            <p>{formatRUB(extra.primeCost * exchangeRate)}</p>
          </div>
        </div>
      </div>
    ))
  );
};
