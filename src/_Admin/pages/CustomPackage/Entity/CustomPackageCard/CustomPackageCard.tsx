import "./CustomPackageCard.css";
import { FC } from "react";
import { CustomPackageDetails } from "@Admin/utils/types";
import { formatRUB, formatUSD } from "@utils/utils";

type Props = {
  customPackageDetails: CustomPackageDetails[];
};

export const CustomPackageCard: FC<Props> = ({ customPackageDetails }) => {
  return (
    <>
      {customPackageDetails.map((cp_details) => (
        <div key={cp_details.price_rub} className="custom-package__card">
          <span>
            {cp_details.likes}&nbsp;<p>Лайки</p>
          </span>
          <span>
            {cp_details.reach}&nbsp;<p>Охват</p>
          </span>
          <span>
            {cp_details.saves}&nbsp;<p>Сохранения</p>
          </span>
          <span>
            {cp_details.profileVisits}&nbsp;<p>Посещения</p>
          </span>
          <span>
            {cp_details.reposts}&nbsp;<p>Репосты</p>
          </span>
          <span>
            {cp_details.videoViews}&nbsp;<p>Просмотры видео</p>
          </span>
          <span>
            {cp_details.countPosts}&nbsp;<p>Постов</p>
          </span>
          <span style={{ marginTop: "15px" }}>
            {formatUSD(cp_details.price_usd)}
          </span>
          <span>{formatRUB(cp_details.price_rub)}</span>
        </div>
      ))}
    </>
  );
};
