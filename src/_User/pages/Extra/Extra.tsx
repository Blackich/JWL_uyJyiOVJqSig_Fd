import "./Extra.css";
import { selectItems } from "./ExtraData";
import { Page } from "@User/components/Page/Page";
import { ExtraServices } from "@User/components/ExtraServices/ExtraServices";

export const Extra = () => {
  return (
    <>
      <Page>
        <div className="container extra-container">
          <div className="extra-services">
            <ExtraServices selectItems={selectItems} />
          </div>
        </div>
      </Page>
    </>
  );
};
