import "./ExtraList.css";
import { extraListApi } from "./_extraListApi";
import { ColumnDef } from "@tanstack/react-table";
import { formatDate, formatRUB } from "@utils/utils";
import { Table } from "@Admin/components/Table/Table";
import { MainBlock } from "@Admin/components/MainBlock/MainBlock";
import { ExtraInfoAdminSide } from "@Admin/utils/types";

export const ExtraList = () => {
  const { data: extraList } = extraListApi.useGetExtraListQuery();

  return (
    <MainBlock title={"Услуги"}>
      <div className="main-block--extra-list">
        {extraList && (
          <Table
            tableData={extraList}
            columnsSetup={extraServicesColumns}
            navigateUrl="/panel/extra"
            initialSort={[{ id: "createdAt", desc: true }]}
          />
        )}
      </div>
    </MainBlock>
  );
};

const extraServicesColumns: ColumnDef<unknown>[] = [
  {
    accessorKey: "userId",
    header: "userId",
  },
  {
    accessorKey: "nickname",
    header: "Nickname",
    enableSorting: false,
  },
  {
    accessorKey: "extraServiceName",
    header: "Услуга",
  },
  {
    accessorKey: "count",
    header: "Кол-во",
  },
  {
    accessorKey: "createdAt",
    header: "Куплен",
    cell: ({ getValue }) => formatDate(getValue() as string),
  },
  {
    accessorKey: "priceRUB",
    header: "Цена",
    cell: ({ getValue }) => formatRUB(getValue() as number),
  },
  {
    accessorKey: "paymentServiceName",
    header: "Оплачено",
    cell: ({ row, getValue }) => (
      <span>
        {(row.original as ExtraInfoAdminSide).siteServiceInfo === null ? (
          <p style={{ color: "#c20000", fontWeight: "500" }}>
            {getValue() as string}
          </p>
        ) : (
          (getValue() as string)
        )}
      </span>
    ),
  },
];
