import "./Service.css";
import { useState } from "react";
import { serviceApi } from "./_serviceApi";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "@store/store";
import { ServiceInfo } from "./Entity/ServiceInfo/ServiceInfo";
import { MainBlock } from "@Admin/components/MainBlock/MainBlock";
import { serviceListApi } from "@Admin/pages/ServiceList/_serviceListApi";
import { ServicePurchase } from "./Entity/ServicePurchase/ServicePurchase";
import { CancelSubsModal } from "./Entity/CancelSubsModal/CancelSubsModal";

export const Service = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const [shownModalCancelSubs, setShownModalCancelSubs] =
    useState<boolean>(false);

  const { data: service, refetch: refetchService } =
    serviceApi.useGetServiceByIdQuery(Number(id));
  const { data: statusSubscription, refetch: refetchStatusSubs } =
    serviceApi.useCheckStatusSubscriptionQuery(Number(id));
  const { data: purchasedService } = serviceApi.useGetPurchasedServiceByIdQuery(
    Number(id),
  );

  const invaldateServiceTable = () =>
    dispatch(serviceListApi.util.invalidateTags(["ServiceList"]));

  return (
    <MainBlock title={`Пакет ${id}`}>
      <div className="main-block--service">
        {service && (
          <ServiceInfo
            service={service}
            refetchService={refetchService}
            invaldateServiceTable={invaldateServiceTable}
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
