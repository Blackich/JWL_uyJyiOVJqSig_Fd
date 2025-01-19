import "./ExtraPurchase.css";
import { FC } from "react";
import { Skeleton } from "@mui/material";
import { siteShortNameById } from "@Admin/utils/utils";

type Props = {
  siteServiceInfo: string;
  serviceId: number;
  serviceStatus?: string;
};

export const ExtraPurchase: FC<Props> = ({
  siteServiceInfo,
  serviceId,
  serviceStatus,
}) => {
  const siteServiceInfoParsed = JSON.parse(siteServiceInfo);
  return (
    <div className="extra-purchase">
      <div className="extra-purchase__item">
        <span>
          <p>
            {serviceNameById[serviceId as keyof typeof serviceNameById] ||
              serviceId}
          </p>
          &nbsp;(
          {siteShortNameById[
            siteServiceInfoParsed[0] as keyof typeof siteShortNameById
          ] || serviceId}
          , {siteServiceInfoParsed[1]})
        </span>
        <span>
          orderId:&nbsp;<p>{siteServiceInfoParsed[2]}</p>
        </span>
        <span>
          {serviceStatus ? (
            serviceStatus === "Completed" ? (
              <>
                Status:&nbsp;<p style={{ color: "green" }}>{serviceStatus}</p>
              </>
            ) : (
              <>
                Status:&nbsp;<p style={{ color: "#c20000" }}>{serviceStatus}</p>
              </>
            )
          ) : (
            <Skeleton width={150} style={{ marginLeft: "4px", padding: 0 }} />
          )}
        </span>
      </div>
    </div>
  );
};

const serviceNameById = {
  1: "followers",
  2: "story",
  3: "comment AI",
  4: "comment hand",
};
