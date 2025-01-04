import "./Extra.css";
import { selectItems } from "./ExtraData";
import { userExtraApi } from "./_extraApi";
import { useAppSelector } from "@store/store";
import { Page } from "@User/components/Page/Page";
import { getUserId } from "@User/auth/_user.slice";
import { ExtraServices } from "@User/components/ExtraServices/ExtraServices";
import { ExtraPurchaseList } from "@User/components/ExtraPurchaseList/ExtraPurchaseList";

export const Extra = () => {
  const userId = useAppSelector(getUserId);
  const { data: extraPurchasedList } =
    userExtraApi.useGetPurchasedExtraByUserIdQuery(Number(userId));
  const { data: extraDetails } = userExtraApi.useGetExtraDetailsQuery();

  return (
    <>
      <Page>
        <div className="container extra-container">
          <div className="extra-services">
            <ExtraServices
              selectItems={selectItems}
              extraDetails={extraDetails}
            />
          </div>
          {extraPurchasedList && extraPurchasedList.length > 0 && (
            <div className="extra-purchased-list">
              <ExtraPurchaseList extraPurchasedList={extraPurchasedList} />
            </div>
          )}
        </div>
      </Page>
    </>
  );
};
