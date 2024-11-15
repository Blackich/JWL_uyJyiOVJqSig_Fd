import "./CustomPackageList.css";
import { Table } from "@Admin/components/Table/Table";
import { MainBlock } from "@Admin/components/MainBlock/MainBlock";
import { customPackageColumns } from "./Entity/CustomPackageTableSetup";
import { customPackageListApi } from "./_customPackageListApi";

export const CustomPackageList = () => {
  const { data: customPackageList } =
    customPackageListApi.useGetCustomPackageListQuery();

  return (
    <MainBlock title={"Кастомные пакеты"}>
      <div className="main-block--custom-package-list">
        {customPackageList && (
          <Table
            tableData={customPackageList}
            navigateUrl={"/panel/package"}
            columnsSetup={customPackageColumns}
          />
        )}
      </div>
    </MainBlock>
  );
};
