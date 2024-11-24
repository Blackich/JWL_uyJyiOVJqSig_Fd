import "./Overview.css";
import { MainBlock } from "@Admin/components/MainBlock/MainBlock";
import { CardList } from "./Entity/CardList/CardList";

export const Overview = () => {
  return (
    <>
      <MainBlock title={"Обзор"}>
        <div className="main-block--overview">
          <CardList />
        </div>
      </MainBlock>
    </>
  );
};
