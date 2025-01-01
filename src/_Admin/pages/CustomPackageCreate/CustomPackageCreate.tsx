import "./CustomPackageCreate.css";
import { useState } from "react";
import { MainBlock } from "@Admin/components/MainBlock/MainBlock";
import { packageApi } from "@Admin/pages/PackageDetails/_packageDetailsApi";
import { PackageInputSetting } from "./Entity/PackageInputSetting/PackageInputSetting";
import { PackageFeatureSet } from "./Entity/PackageFeatureSet/PackageFeatureSet";
import { customPackageCreateApi } from "./_customPackageCreateApi";
import { AlertMessage } from "@ui/AlertMessage/AlertMessage";
import { useDispatch } from "react-redux";
import { customPackageListApi } from "../CustomPackageList/_customPackageListApi";

export const CustomPackageCreate = () => {
  const dispatch = useDispatch();
  const [isOpenAlertSuccess, setOpenAlertSuccess] = useState<boolean>(false);
  const [isOpenAlertError, setOpenAlertError] = useState<boolean>(false);
  const { data: packageSettings } = packageApi.useGetPackageSettingsQuery();
  const [createCustomPack] =
    customPackageCreateApi.useCreateCustomPackageMutation();
  const invaldateCustomPackage = () =>
    dispatch(customPackageListApi.util.invalidateTags(["customPackageList"]));

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
      if (res?.data) {
        setOpenAlertSuccess(true);
        invaldateCustomPackage();
      }
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

          {packageSettings && (
            <PackageFeatureSet
              customPackData={customPackData}
              packageSettings={packageSettings}
              factPrice={factPrice}
              setFactPrice={setFactPrice}
              handleCreateCustomPack={handleCreateCustomPack}
            />
          )}
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
