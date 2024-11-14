import "./Services.css";
import { MainBlock } from "@Admin/components/MainBlock/MainBlock";
import { Table } from "@Admin/components/Table/Table";
import { servicesColumns } from "./Entity/ServicesTableSetup";
import { servicesApi } from "./_servicesApi";

export const Services = () => {
  const { data: serviceList } = servicesApi.useGetPurchasedServiceListQuery();

  return (
    <MainBlock title={"Услуги"}>
      <div className="main-block--services">
        {serviceList && (
          <Table
            tableData={serviceList}
            navigateUrl={"/panel/services"}
            columnsSetup={servicesColumns}
          />
        )}
      </div>
    </MainBlock>
  );
};
