import "./CustomPackageCard.css";
import { FC } from "react";
import { CustomPackageSettings } from "@Admin/utils/types";
import { formatRUB, formatUSD } from "@utils/utils";

type Props = {
  customPackage: CustomPackageSettings[];
};

export const CustomPackageCard: FC<Props> = ({ customPackage }) => {
  return (
    <>
      {customPackage.map((cp_setting) => (
        <div key={cp_setting.price_rub} className="custom-package__card">
          <span>
            {cp_setting.likes}&nbsp;<p>Лайки</p>
          </span>
          <span>
            {cp_setting.reach}&nbsp;<p>Охват</p>
          </span>
          <span>
            {cp_setting.saves}&nbsp;<p>Сохранения</p>
          </span>
          <span>
            {cp_setting.profileVisits}&nbsp;<p>Посещения</p>
          </span>
          <span>
            {cp_setting.reposts}&nbsp;<p>Репосты</p>
          </span>
          <span>
            {cp_setting.videoViews}&nbsp;<p>Просмотры видео</p>
          </span>
          <span>
            {cp_setting.countPosts}&nbsp;<p>Постов</p>
          </span>
          <span style={{ marginTop: "15px" }}>
            {formatUSD(cp_setting.price_usd)}
          </span>
          <span>{formatRUB(cp_setting.price_rub)}</span>
        </div>
      ))}
    </>
  );
};
