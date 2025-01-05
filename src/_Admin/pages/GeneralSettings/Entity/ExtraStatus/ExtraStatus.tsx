import { Switch } from "@mui/material";
import {
  ExtraServiceStatus,
  generalSettingsApi,
} from "@Admin/pages/GeneralSettings/_generalSettingsApi";

export const ExtraStatus = () => {
  const { data: extraServicesStatus } =
    generalSettingsApi.useGetExtraServicesStatusQuery();
  const [updateExtraServiceStatus] =
    generalSettingsApi.useChangeStatusExtraServiceByIdMutation();

  const handleChangeExtraStatus = async (setting: ExtraServiceStatus) => {
    return await updateExtraServiceStatus({
      extraServiceId: setting.extraServiceId,
    });
  };

  return (
    <div className="general-settings__wrapper">
      <p className="general-settings__title">Дополнительные услуги</p>
      {extraServicesStatus &&
        extraServicesStatus.map((setting) => (
          <div key={setting.extraServiceId} className="general-settings__item">
            <Switch
              defaultChecked={setting.status === 1 ? true : false}
              color="secondary"
              onChange={() => handleChangeExtraStatus(setting)}
            />
            <span>{setting.serviceName}</span>
          </div>
        ))}
    </div>
  );
};
