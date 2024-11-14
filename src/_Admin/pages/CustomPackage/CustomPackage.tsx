import "./CustomPackage.css";
import { useState } from "react";
import { MainBlock } from "@Admin/components/MainBlock/MainBlock";
import { packageApi } from "@Admin/pages/Packages/_packageApi";
import { PackageInputSetting } from "./Entity/PackageInputSetting/PackageInputSetting";
import { PackageFeatureSet } from "./Entity/PackageFeatureSet/PackageFeatureSet";
import { customPackageApi } from "./_customPackageApi";

export const CustomPackage = () => {
  const { data: packageDetails } = packageApi.useGetPackageDetailsQuery();
  const [createCustomPack] = customPackageApi.useCreateCustomPackageMutation();

  const [factPrice, setFactPrice] = useState({
    price_usd: 0,
    price_rub: 0,
  });
  const [customPackData, setCustomPackData] = useState({
    likes: 1000,
    reach: 2000,
    saves: 100,
    profileVisits: 100,
    reposts: 100,
    videoViews: 3000,
    countPosts: 15,
  });

  const handleCreateCustomPack = () => {
    createCustomPack({
      ...customPackData,
      ...factPrice,
    });
  };

  return (
    <MainBlock title={"Создание пакета"}>
      <div className="main-block--custom-package">
        <div className="custom-package__wrapper">
          <PackageInputSetting
            customPackData={customPackData}
            setCustomPackData={setCustomPackData}
          />

          {packageDetails && (
            <PackageFeatureSet
              customPackData={customPackData}
              packageDetails={packageDetails}
              factPrice={factPrice}
              setFactPrice={setFactPrice}
              handleCreateCustomPack={handleCreateCustomPack}
            />
          )}
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
  );
};
