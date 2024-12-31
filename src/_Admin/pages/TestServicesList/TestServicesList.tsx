import "./TestServicesList.css";
import { formatDate } from "@utils/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Table } from "@Admin/components/Table/Table";
import { testServiceListApi } from "./_testServiceListApi";
import { MainBlock } from "@Admin/components/MainBlock/MainBlock";

export const TestServicesList = () => {
  const { data: testServicesList } =
    testServiceListApi.useGetTestServicesSentQuery();

  return (
    <MainBlock title={"Тестовые услуги"}>
      <div className="main-block--test-services-list">
        {testServicesList && (
          <Table
            tableData={testServicesList}
            columnsSetup={testServicesColumns}
            isExternalLink={true}
            initialSort={[{ id: "createdAt", desc: true }]}
          />
        )}
      </div>
    </MainBlock>
  );
};

const testServicesColumns: ColumnDef<unknown>[] = [
  {
    accessorKey: "testServiceName",
    header: "Тест",
    enableSorting: false,
  },
  {
    accessorKey: "senderName",
    header: "Отправитель",
    enableSorting: false,
  },
  {
    accessorKey: "link",
    header: "Ссылка",
    enableSorting: false,
    cell: ({ getValue }) => (
      <p style={{ textAlign: "left", paddingLeft: "10px" }}>
        {getValue() as string}
      </p>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Отправлен",
    cell: ({ getValue }) => formatDate(getValue() as string),
  },
];
