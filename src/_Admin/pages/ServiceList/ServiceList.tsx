import "./ServiceList.css";
import { MainBlock } from "@Admin/components/MainBlock/MainBlock";
import { Table } from "@Admin/components/Table/Table";
import { serviceListApi } from "./_serviceListApi";
import { ColumnDef } from "@tanstack/react-table";
import { Service } from "@Admin/utils/types";
import { daysUntilFutureDate, formatRUB, formatUSD } from "@utils/utils";

export const ServiceList = () => {
  const { data: serviceList } = serviceListApi.useGetServiceListQuery();

  return (
    <MainBlock title={"Пакеты"}>
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
    accessorKey: "countPosts",
    header: "Постов",
  },
  {
    accessorKey: "createdAt",
    header: "Истечёт",
    cell: ({ getValue, row }) => {
      const dateTimeService = daysUntilFutureDate(getValue() as string);
      const status = (row.original as Service).status;

      if (dateTimeService !== 0 && status === 1) return dateTimeService;
      if (dateTimeService !== 0 && status === 0)
        return <p style={{ color: "#c20000", fontWeight: "500" }}>Отменён</p>;

      return <p style={{ color: "#c20000", fontWeight: "500" }}>Истёк</p>;
    },
  },
  {
    accessorKey: "cost",
    header: "Цена",
    cell: ({ row }) => (
      <span>
        {(row.original as Service).currency === "USD" ? (
          <p style={{ color: "blue" }}>
            {formatUSD((row.original as Service).cost)}
          </p>
        ) : (
          formatRUB((row.original as Service).cost)
        )}
      </span>
    ),
  },
  {
    accessorKey: "paymentServiceName",
    header: "Оплачено",
  },
];
