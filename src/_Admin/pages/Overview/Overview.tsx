import "./Overview.css";
import { MainBlock } from "@Admin/components/MainBlock/MainBlock";
import { CardInfo } from "@Admin/pages/Overview/Entity/CardInfo/CardInfo";
import { overviewApi } from "@Admin/pages/Overview/_overviewApi";
import { TotalUsersSVG } from "@Admin/utils/svg/OverviewSvg";
import { formatUSD } from "@/utils/utils";

export const Overview = () => {
  const { data: jp } = overviewApi.useGetBalanceJPQuery();
  const { data: vr } = overviewApi.useGetBalanceVRQuery();
  const { data: count } = overviewApi.useGetUsersCountQuery();
  // const { data: spent } = overviewApi.useGetUsersSpentQuery();

  return (
    <>
      <MainBlock title={"Обзор"}>
        <div className="main-block--overview">
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
          {/* <CardInfo
            titleCard="Всего продаж"
            favicon={<TotalSalesSVG />}
            cardValue={spent ? formatRUB(spent) : 0}
          /> */}
        </div>
      </MainBlock>
    </>
  );
};
