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
      {customPackage.map((pack_detail) => (
        <div key={pack_detail.price_rub} className="custom-package__card">
          <span>
            {pack_detail.likes}&nbsp;<p>Лайки</p>
          </span>
          <span>
            {pack_detail.reach}&nbsp;<p>Охват</p>
          </span>
          <span>
            {pack_detail.saves}&nbsp;<p>Сохранения</p>
          </span>
          <span>
            {pack_detail.profileVisits}&nbsp;<p>Посещения</p>
          </span>
          <span>
            {pack_detail.reposts}&nbsp;<p>Репосты</p>
          </span>
          <span>
            {pack_detail.videoViews}&nbsp;<p>Просмотры видео</p>
          </span>
          <span>
            {pack_detail.countPosts}&nbsp;<p>Постов</p>
          </span>
          <span style={{ marginTop: "15px" }}>
            {formatUSD(pack_detail.price_usd)}
          </span>
          <span>{formatRUB(pack_detail.price_rub)}</span>
        </div>
      ))}
    </>
  );
};
