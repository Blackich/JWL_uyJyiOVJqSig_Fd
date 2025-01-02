import "./ExtraDetails.css";
import { ExtraCard } from "./Entity/ExtraCard/ExtraCard";
import { MainBlock } from "@Admin/components/MainBlock/MainBlock";

export const ExtraDetails = () => {
  return (
    <MainBlock title={"Доп. услуги"}>
      <div className="main-block--extra-details">
        <ExtraCard />
      </div>
    </MainBlock>
  );
};
