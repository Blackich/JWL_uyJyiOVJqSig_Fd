import "./Packages.css";
import { useState } from "react";
import { MainBlock } from "@Admin/components/MainBlock/MainBlock";
import { PackageCard } from "@Admin/pages/Packages/Entity/PackageCard/PackageCard";
import { Button } from "@mui/material";
import { packageApi } from "./_packageApi";
import { calcPrimeCostPackage } from "@Admin/utils/utils";

export const Packages = () => {
  const [indexButton, setIndexButton] = useState<number>(1);

  const { data: packages } = packageApi.useGetPackagesQuery();
  const { data: packageDetails } = packageApi.useGetPackageDetailsQuery();
  const { data: exchangeRate } = packageApi.useGetExchangeRateQuery();
  const primeCostList = packageDetails?.map((detail) => detail.price);
  const ratioPackageList = packageDetails?.map((detail) => detail.ratio);

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
            {packages &&
              exchangeRate &&
              primeCostList &&
              ratioPackageList &&
              packages.map((pack) => (
                <PackageCard
                  key={pack.id}
                  likes={pack.likes}
                  actCostRUB15={pack.price_rub_15}
                  actCostRUB30={pack.price_rub_30}
                  actCostUSD15={pack.price_usd_15}
                  actCostUSD30={pack.price_usd_30}
                  indexButton={indexButton}
                  usdRub={exchangeRate}
                  primeCost={calcPrimeCostPackage(
                    primeCostList,
                    ratioPackageList,
                    pack.likes,
                  )}
                />
              ))}
          </div>
          <div className="package-details__container">
            {packageDetails &&
              packageDetails.map((pack_details) => (
                <div style={{ marginTop: "10px" }} key={pack_details.id}>
                  {pack_details.id}.{" "}
                  {pack_details.siteId === 1 ? "Venro" : "JustPanel"}{" "}
                  {pack_details.serviceId} {pack_details.typeService}{" "}
                  {pack_details.price}
                </div>
              ))}
          </div>
        </div>
      </MainBlock>
    </>
  );
};
