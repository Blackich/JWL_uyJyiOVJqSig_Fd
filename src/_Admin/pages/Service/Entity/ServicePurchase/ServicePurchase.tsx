import "./ServicePurchase.css";
import { FC } from "react";
import {
  PurchasedServiceWithName,
  StatusPurchasedService,
} from "@Admin/utils/types";
import { Skeleton } from "@mui/material";
import { siteNameById } from "@Admin/utils/utils";

type Props = {
  purchasedService: PurchasedServiceWithName[];
  statusSubscription?: StatusPurchasedService[];
};

export const ServicePurchase: FC<Props> = ({
  purchasedService,
  statusSubscription,
}) => {
  return (
    <div className="service-purchase">
      {purchasedService.map((service, index) => (
        <div key={service.id} className="service-purchase__item">
          <span>
            <p>{service.typeService}</p>&nbsp;(
            {siteNameById[service.siteId as keyof typeof siteNameById] ||
              service.siteId}
            , {service.siteServiceId})
          </span>
          <span>
            orderId:&nbsp;
            <p>{service.orderId}</p>
          </span>
          {statusSubscription ? (
            <>
              <span>
                Status:&nbsp;
                {statusSubscription[index].status === "Active" ? (
                  <p style={{ color: "green" }}>
                    {statusSubscription[index].status}
                  </p>
                ) : (
                  <p style={{ color: "#c20000" }}>
                    {statusSubscription[index].status}
                  </p>
                )}
              </span>
              {statusSubscription[index].remains && (
                <span>
                  Remains:&nbsp;
                  <p>{statusSubscription[index].remains}</p>
                </span>
              )}
              {"expiry" in statusSubscription[index] && (
                <span>
                  Posts:&nbsp;
                  <p>{statusSubscription[index].posts}</p>
                </span>
              )}
            </>
          ) : (
            <>
              <Skeleton width={150} style={{ marginLeft: "6px" }} />
              <Skeleton width={100} style={{ marginLeft: "6px" }} />
            </>
          )}
        </div>
      ))}
    </div>
  );
};
