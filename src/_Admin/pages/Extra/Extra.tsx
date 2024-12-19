import "./Extra.css";
import { extraApi } from "./_extraApi";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "@store/store";
import { ExtraInfo } from "./Entity/ExtraInfo/ExtraInfo";
import { MainBlock } from "@Admin/components/MainBlock/MainBlock";
import { extraListApi } from "@Admin/pages/ExtraList/_extraListApi";
import { ExtraPurchase } from "./Entity/ExtraPurchase/ExtraPurchase";
import { SendExtraComments } from "./Entity/SendExtraComments/SendExtraComments";

export const Extra = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { data: extra } = extraApi.useGetExtraByIdQuery(Number(id));
  const { data: status } = extraApi.useCheckStatusForExtraQuery(Number(id));
  const invaldateExtraTable = () =>
    dispatch(extraListApi.util.invalidateTags(["ExtraList"]));
  const invaldateExtra = () =>
    dispatch(extraApi.util.invalidateTags(["Extra"]));

  return (
    <MainBlock title={`Услуга ${id}`}>
      <div className="main-block--extra">
        {extra && (
          <>
            <ExtraInfo extra={extra} />
            {extra.siteServiceInfo ? (
              <ExtraPurchase
                siteServiceInfo={extra.siteServiceInfo}
                serviceId={extra.extraServiceId}
                serviceStatus={status?.status}
              />
            ) : (
              <SendExtraComments
                extraId={extra.id}
                extraServiceId={extra.extraServiceId}
                invaldateExtraTable={invaldateExtraTable}
                invaldateExtra={invaldateExtra}
              />
            )}
          </>
        )}
      </div>
    </MainBlock>
  );
};
