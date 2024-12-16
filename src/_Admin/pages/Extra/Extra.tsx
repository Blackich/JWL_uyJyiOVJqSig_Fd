import "./Extra.css";
import { extraApi } from "./_extraApi";
import { useParams } from "react-router-dom";
import { MainBlock } from "@Admin/components/MainBlock/MainBlock";
import { ExtraInfo } from "./Entity/ExtraInfo/ExtraInfo";
import { ExtraPurchase } from "./Entity/ExtraPurchase/ExtraPurchase";

export const Extra = () => {
  const { id } = useParams();
  const { data: extra } = extraApi.useGetExtraByIdQuery(Number(id));
  const { data: status } = extraApi.useCheckStatusForExtraQuery(Number(id));
  return (
    <MainBlock title={`Услуга ${id}`}>
      <div className="main-block--extra">
        {extra && <ExtraInfo extra={extra} />}
        {extra && extra.siteServiceInfo && (
          <ExtraPurchase
            siteServiceInfo={extra.siteServiceInfo}
            serviceId={extra.extraServiceId}
            serviceStatus={status?.status}
          />
        )}
      </div>
    </MainBlock>
  );
};
