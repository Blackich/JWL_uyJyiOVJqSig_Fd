import "./CustomPackageCreate.css";
import { useState } from "react";
import { MainBlock } from "@Admin/components/MainBlock/MainBlock";
import { packageApi } from "@Admin/pages/Packages/_packageApi";
import { PackageInputSetting } from "./Entity/PackageInputSetting/PackageInputSetting";
import { PackageFeatureSet } from "./Entity/PackageFeatureSet/PackageFeatureSet";
import { customPackageCreateApi } from "./_customPackageCreateApi";
import { AlertMessage } from "@ui/AlertMessage/AlertMessage";

export const CustomPackageCreate = () => {
  const [isOpenAlertSuccess, setOpenAlertSuccess] = useState<boolean>(false);
  const [isOpenAlertError, setOpenAlertError] = useState<boolean>(false);
  const { data: packageDetails } = packageApi.useGetPackageDetailsQuery();
  const [createCustomPack] =
    customPackageCreateApi.useCreateCustomPackageMutation();

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

  const handleCreateCustomPack = async () => {
    await createCustomPack({
      ...customPackData,
      ...factPrice,
    }).then((res) => {
      if (res?.data) return setOpenAlertSuccess(true);
      if (res?.error) return setOpenAlertError(true);
    });
  };

  return (
    <MainBlock title={"Создание пакета"}>
      <div className="main-block--custom-package-create">
        <div className="custom-package-create__wrapper">
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
      <AlertMessage
        message="Пакет успешно создан"
        type="success"
        isOpen={isOpenAlertSuccess}
        onClose={() => setOpenAlertSuccess(false)}
      />
      <AlertMessage
        message="Не удалось создать пакет"
        type="error"
        isOpen={isOpenAlertError}
        onClose={() => setOpenAlertError(false)}
      />
    </MainBlock>
  );
};
