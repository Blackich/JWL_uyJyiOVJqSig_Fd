import "./ServiceList.css";
import { MainBlock } from "@Admin/components/MainBlock/MainBlock";
import { Table } from "@Admin/components/Table/Table";
import { serviceListApi } from "./_serviceListApi";
import { ColumnDef } from "@tanstack/react-table";
import { Service } from "@Admin/utils/types";
import { daysUntilFutureDate } from "@utils/utils";

export const ServiceList = () => {
  const { data: serviceList } = serviceListApi.useGetServiceListQuery();

  return (
    <MainBlock title={"Услуги"}>
      <div className="main-block--service-list">
        {serviceList && (
          <Table
            tableData={serviceList}
            columnsSetup={servicesColumns}
            navigateUrl="/panel/services"
            initialSort={[{ id: "createdAt", desc: true }]}
          />
        )}
      </div>
    </MainBlock>
  );
};

const servicesColumns: ColumnDef<unknown>[] = [
  {
    accessorKey: "userId",
    header: "userId",
  },
  {
    accessorKey: "fullName",
    header: "Приглашен",
    enableSorting: false,
  },
  {
    accessorKey: "nickname",
    header: "Nickname",
    enableSorting: false,
  },
  {
    header: "Пакет",
    cell: ({ row }) => (
      <span>
        {(row.original as Service).packageLikes === null ? (
          <p style={{ color: "blue", fontStyle: "italic" }}>
            {(row.original as Service).customLikes}
          </p>
        ) : (
          (row.original as Service).packageLikes
        )}
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Истечёт",
    cell: ({ getValue }) =>
      daysUntilFutureDate(getValue() as string) !== 0 ? (
        daysUntilFutureDate(getValue() as string)
      ) : (
        <p style={{ color: "#c20000", fontWeight: "500" }}>Истёк</p>
      ),
  },
  {
    accessorKey: "countPosts",
    header: "Постов",
  },
  {
    accessorKey: "orderId",
    header: "orderId",
    enableSorting: false,
  },
  {
    accessorKey: "cost",
    header: "Цена",
  },
  {
    accessorKey: "currency",
    header: "Валюта",
  },
];
