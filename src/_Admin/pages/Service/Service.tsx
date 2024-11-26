import "./Service.css";
import { useParams } from "react-router-dom";
import { serviceApi } from "./_serviceApi";
import { ServiceInfo } from "./Entity/ServiceInfo/ServiceInfo";
import { MainBlock } from "@Admin/components/MainBlock/MainBlock";
import { ServicePurchase } from "./Entity/ServicePurchase/ServicePurchase";

export const Service = () => {
  const { id } = useParams();

  const { data: service, refetch: refetchService } =
    serviceApi.useGetServiceByIdQuery(Number(id));
  const { data: statusSubscription } =
    serviceApi.useCheckStatusSubscriptionQuery(Number(id));
  const { data: purchasedService } = serviceApi.useGetPurchasedServiceByIdQuery(
    Number(id),
  );

  return (
    <MainBlock title={`Услуга ${id}`}>
      <div className="main-block--service">
        {service && (
          <ServiceInfo service={service} refetchService={refetchService} />
        )}
        {purchasedService && (
          <ServicePurchase
            purchasedService={purchasedService}
            statusSubscription={statusSubscription}
          />
        )}
      </div>
    </MainBlock>
  );
};
