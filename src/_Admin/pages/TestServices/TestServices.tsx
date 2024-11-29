import "./TestServices.css";
import { MainBlock } from "@Admin/components/MainBlock/MainBlock";
import { TestPackage } from "./Entity/TestPackage/TestPackage";

export const TestServices = () => {
  return (
    <MainBlock title={"Тестовые услуги"}>
      <div className="main-block--test-services">
        <TestPackage />
      </div>
    </MainBlock>
  );
};
