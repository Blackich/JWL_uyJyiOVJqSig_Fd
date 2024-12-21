import "./Packages.css";
import { useState } from "react";
import { Button } from "@mui/material";
import { packageApi } from "./_packageApi";
import { calcPrimeCostPackage } from "@Admin/utils/utils";
import { MainBlock } from "@Admin/components/MainBlock/MainBlock";
import { PackageCard } from "@Admin/pages/Packages/Entity/PackageCard/PackageCard";

export const Packages = () => {
  const [indexButton, setIndexButton] = useState<number>(1);

  const { data: packageDetails } = packageApi.useGetPackageDetailsQuery();
  const { data: packageSettings } = packageApi.useGetPackageSettingsQuery();
  const { data: exchangeRate } = packageApi.useGetExchangeRateQuery();
  const primeCostList = packageSettings?.map((setting) => setting.price);
  const ratioPackageList = packageSettings?.map((setting) =>
    Number(setting.ratio),
  );
  return (
    <>
      <MainBlock title={"Пакеты"}>
        <div className="main-block--packages">
          <div className="package__control">
            <Button
              variant={`${indexButton === 1 ? "contained" : "outlined"}`}
              onClick={() => setIndexButton(1)}
            >
              15 постов
            </Button>
            <Button
              variant={`${indexButton === 2 ? "contained" : "outlined"}`}
              onClick={() => setIndexButton(2)}
            >
              30 постов
            </Button>
          </div>
          <div className="package__container">
            {packageDetails &&
              exchangeRate &&
              primeCostList &&
              ratioPackageList &&
              packageDetails.map((detail) => (
                <PackageCard
                  key={detail.id}
                  likes={detail.likes}
                  actCostRUB15={detail.price_rub_15}
                  actCostRUB30={detail.price_rub_30}
                  actCostUSD15={detail.price_usd_15}
                  actCostUSD30={detail.price_usd_30}
                  indexButton={indexButton}
                  usdRub={exchangeRate}
                  primeCost={calcPrimeCostPackage(
                    primeCostList,
                    ratioPackageList,
                    detail.likes,
                  )}
                />
              ))}
          </div>
          <div className="package-settings__container">
            {packageSettings &&
              packageSettings.map((setting) => (
                <div style={{ marginTop: "10px" }} key={setting.id}>
                  {setting.id}. {setting.siteId === 1 ? "Venro" : "JustPanel"}{" "}
                  {setting.serviceId} {setting.typeService} {setting.price}
                </div>
              ))}
          </div>
        </div>
      </MainBlock>
    </>
  );
};
