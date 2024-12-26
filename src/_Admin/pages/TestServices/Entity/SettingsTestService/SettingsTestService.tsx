import "./SettingsTestService.css";
import { FC } from "react";
import { formatRUB, formatUSD } from "@utils/utils";
import { TestServiceSettings } from "@Admin/utils/types";
import { packageApi } from "@Admin/pages/Packages/_packageApi";
import { testServiceApi } from "@Admin/pages/TestServices/_testServicesApi";

type Props = {
  testServiceId: string;
};

export const SettingsTestService: FC<Props> = ({ testServiceId }) => {
  const { data: exchangeRate } = packageApi.useGetExchangeRateQuery();
  const { data: testSettings } =
    testServiceApi.useGetTestServiceSettingsQuery();

  const calcPrimeCost = (settings: TestServiceSettings[]) => {
    return settings
      .filter((setting) => setting.testServiceId === Number(testServiceId))
      .reduce(
        (acc, setting) => acc + (setting.count / 1000) * Number(setting.cost),
        0,
      );
  };

  return (
    testServiceId !== "" &&
    testSettings &&
    exchangeRate && (
      <div className="test-services__test-settings">
        <div className="test-settings__prime-cost">
          Себестоимость: &nbsp;{formatUSD(calcPrimeCost(testSettings))}&nbsp;
          {"  /  "}&nbsp;{formatRUB(calcPrimeCost(testSettings) * exchangeRate)}
        </div>
        {[...testSettings]
          .filter((setting) => setting.testServiceId === Number(testServiceId))
          .sort((a, b) => a.siteId - b.siteId)
          .map((setting) => (
            <div key={setting.id} className="test-settings__item">
              <span>
                {siteNameById[setting.siteId as keyof typeof siteNameById] ||
                  setting.siteId}
              </span>
              <span>{setting.serviceId}</span>
              <span>{setting.typeService}</span>
              <span>{setting.count}</span>
              <span>{Number(setting.cost)}</span>
            </div>
          ))}
      </div>
    )
  );
};

const siteNameById = {
  1: "Venro",
  2: "JustPanel",
  3: "Wiq",
};
