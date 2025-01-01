import "./PackageDetails.css";
import { useState } from "react";
import { Button } from "@mui/material";
import { packageApi } from "./_packageDetailsApi";
import { PackageCard } from "./Entity/PackageCard/PackageCard";
import { MainBlock } from "@Admin/components/MainBlock/MainBlock";

export const PackageDetails = () => {
  const [indexButton, setIndexButton] = useState<number>(1);

  const { data: packageDetails } = packageApi.useGetPackageDetailsQuery();
  const { data: packageSettings } = packageApi.useGetPackageSettingsQuery();
  const { data: exchangeRate } = packageApi.useGetExchangeRateQuery();
  return (
    <>
      <MainBlock title={"Пакеты"}>
        <div className="main-block--package-details">
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
              packageSettings &&
              exchangeRate &&
              packageDetails.map((details) => (
                <PackageCard
                  key={details.id}
                  packageDetails={details}
                  packageSettings={packageSettings}
                  indexButton={indexButton}
                  usdRub={exchangeRate}
                />
              ))}
          </div>
          <div className="package-settings__container">
            {packageSettings &&
              [...packageSettings]
                .sort((a, b) => a.siteId - b.siteId)
                .map((setting) => (
                  <div style={{ marginTop: "10px" }} key={setting.id}>
                    {setting.siteId === 1 ? "Venro" : "JustPanel"}{" "}
                    {setting.serviceId} {setting.typeService}{" "}
                    {Number(setting.cost)}
                  </div>
                ))}
          </div>
        </div>
      </MainBlock>
    </>
  );
};
