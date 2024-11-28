import "./CardList.css";
import { CardInfo } from "@Admin/pages/Overview/Entity/CardInfo/CardInfo";
import { overviewApi } from "@Admin/pages/Overview/_overviewApi";
import { formatRUB, formatUSD } from "@/utils/utils";
import {
  TotalUsersSVG,
  TotalPurchasedPackSVG,
  TotalSalesSVG,
} from "@Admin/utils/svg/OverviewSvg";

export const CardList = () => {
  const { data: jp } = overviewApi.useGetBalanceJPQuery();
  const { data: vr } = overviewApi.useGetBalanceVRQuery();
  const { data: usersCount } = overviewApi.useGetUsersCountQuery();
  const { data: totalSpent } = overviewApi.useGetTotalSpentQuery();
  const { data: boughtPack } = overviewApi.useGetPurchasedPackagesCountQuery();
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
        cardValue={usersCount ? usersCount : 0}
      />
      <CardInfo
        titleCard="Куплено пакетов"
        favicon={<TotalPurchasedPackSVG />}
        cardValue={boughtPack ? boughtPack : 0}
      />
      <CardInfo
        titleCard="Всего продаж"
        favicon={<TotalSalesSVG />}
        cardValue={totalSpent ? formatRUB(totalSpent) : 0}
      />
    </div>
  );
};
