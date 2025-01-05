import "./GeneralSettings.css";
import { Switch } from "@mui/material";
import { MainBlock } from "@Admin/components/MainBlock/MainBlock";
import {
  GeneralSettings as GeneralSettingsType,
  generalSettingsApi,
} from "./_generalSettingsApi";
import { ExtraStatus } from "./Entity/ExtraStatus/ExtraStatus";

export const GeneralSettings = () => {
  const { data: generalSettings } =
    generalSettingsApi.useGetGeneralSettingsQuery();
  const [updateGeneralSettingStatus] =
    generalSettingsApi.useChangeStatusGenSettingByIdMutation();

  const handleChangeSettingStatus = async (setting: GeneralSettingsType) => {
    return await updateGeneralSettingStatus({
      settingId: setting.id,
    });
  };
  return (
    <MainBlock title={"Настройки сайта"}>
      <div className="main-block--general-settings">
        <div className="general-settings__wrapper">
          <p className="general-settings__title">Основные настройки</p>
          {generalSettings &&
            generalSettings.map((setting) => (
              <div key={setting.id} className="general-settings__item">
                <Switch
                  defaultChecked={setting.status === 1 ? true : false}
                  color="success"
                  onChange={() => handleChangeSettingStatus(setting)}
                />
                <span>{setting.description}</span>
              </div>
            ))}
        </div>
        <ExtraStatus />
      </div>
    </MainBlock>
  );
};
