import "./CardList.css";
import { CardInfo } from "@Admin/pages/Overview/Entity/CardInfo/CardInfo";
import { overviewApi } from "@Admin/pages/Overview/_overviewApi";
import { TotalUsersSVG } from "@Admin/utils/svg/OverviewSvg";
import { formatUSD } from "@/utils/utils";

export const CardList = () => {
  const { data: jp } = overviewApi.useGetBalanceJPQuery();
  const { data: vr } = overviewApi.useGetBalanceVRQuery();
  const { data: count } = overviewApi.useGetUsersCountQuery();
  return (
    <div className="overview__card-list">
      <CardInfo
        titleCard="Venro"
        favicon="venro.ru"
        cardValue={vr ? formatUSD(vr) : 0}
      />
      <CardInfo
        titleCard="JustPanel"
        favicon="justanotherpanel.com"
        cardValue={jp ? formatUSD(jp) : 0}
      />
      <CardInfo
        titleCard="Всего пользователей"
        favicon={<TotalUsersSVG />}
        cardValue={count ? count : 0}
      />
      <CardInfo
        titleCard="Всего пользователей"
        favicon={<TotalUsersSVG />}
        cardValue={count ? count : 0}
      />
    </div>
  );
};
