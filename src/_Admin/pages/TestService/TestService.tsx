import "./TestService.css";
import { useState } from "react";
import { MainBlock } from "@Admin/components/MainBlock/MainBlock";
import { DetailsTestService } from "./Entity/DetailsTestService/DetailsTestService";
import { SettingsTestService } from "./Entity/SettingsTestService/SettingsTestService";

export const TestService = () => {
  const [testServiceId, setTestServiceId] = useState("");

  return (
    <MainBlock title={"Тестовые услуги"}>
      <div className="main-block--test-services">
        <DetailsTestService
          testServiceId={testServiceId}
          setTestServiceId={setTestServiceId}
        />
        <SettingsTestService testServiceId={testServiceId} />
      </div>
    </MainBlock>
  );
};
