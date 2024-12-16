import "./Service.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { serviceApi } from "./_serviceApi";
import { ServiceInfo } from "./Entity/ServiceInfo/ServiceInfo";
import { MainBlock } from "@Admin/components/MainBlock/MainBlock";
import { ServicePurchase } from "./Entity/ServicePurchase/ServicePurchase";
import { CancelSubsModal } from "./Entity/CancelSubsModal/CancelSubsModal";

export const Service = () => {
  const { id } = useParams();
  const [shownModalCancelSubs, setShownModalCancelSubs] =
    useState<boolean>(false);

  const { data: service, refetch: refetchService } =
    serviceApi.useGetServiceByIdQuery(Number(id));
  const { data: statusSubscription, refetch: refetchStatusSubs } =
    serviceApi.useCheckStatusSubscriptionQuery(Number(id));
  const { data: purchasedService } = serviceApi.useGetPurchasedServiceByIdQuery(
    Number(id),
  );

  return (
    <MainBlock title={`Пакет ${id}`}>
      <div className="main-block--service">
        {service && (
          <ServiceInfo
            service={service}
            refetchService={refetchService}
            setShownModalCancelSubs={setShownModalCancelSubs}
          />
        )}
        {purchasedService && (
          <ServicePurchase
            purchasedService={purchasedService}
            statusSubscription={statusSubscription}
          />
        )}
      </div>
      {purchasedService && (
        <CancelSubsModal
          shownModal={shownModalCancelSubs}
          onClose={() => setShownModalCancelSubs(false)}
          refetchStatusSubs={refetchStatusSubs}
          serviceId={Number(id)}
        />
      )}
    </MainBlock>
  );
};
