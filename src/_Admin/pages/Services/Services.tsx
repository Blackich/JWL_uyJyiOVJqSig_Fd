import "./Services.css";
import { MainBlock } from "@Admin/components/MainBlock/MainBlock";
import { Table } from "@Admin/components/Table/Table";
// import { servicesColumns } from "./Entity/ServicesTableSetup";
import { servicesApi } from "./_servicesApi";
import { ColumnDef } from "@tanstack/react-table";
import { PurchasedService } from "@Admin/utils/types";
import { daysUntilFutureDate } from "@/utils/utils";

export const Services = () => {
  const { data: serviceList } = servicesApi.useGetPurchasedServiceListQuery();

  return (
    <MainBlock title={"Услуги"}>
      <div className="main-block--services">
        {serviceList && (
          <Table tableData={serviceList} columnsSetup={servicesColumns} />
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
        {(row.original as PurchasedService).packageLikes === null ? (
          <p style={{ color: "blue", fontStyle: "italic" }}>
            {(row.original as PurchasedService).customLikes}
          </p>
        ) : (
          (row.original as PurchasedService).packageLikes
        )}
      </span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Истечёт",
    cell: ({ getValue }) => daysUntilFutureDate(getValue() as string),
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
