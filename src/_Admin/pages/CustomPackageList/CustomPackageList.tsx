import "./CustomPackageList.css";
import { ColumnDef } from "@tanstack/react-table";
import { formatRUB, formatUSD } from "@/utils/utils";
import { Table } from "@Admin/components/Table/Table";
import { MainBlock } from "@Admin/components/MainBlock/MainBlock";
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
            navigateUrl={"/panel/custom-package"}
            columnsSetup={customPackageColumns}
          />
        )}
      </div>
    </MainBlock>
  );
};

const customPackageColumns: ColumnDef<unknown>[] = [
  {
    accessorKey: "likes",
    header: "Лайки",
  },
  {
    accessorKey: "reach",
    header: "Охват",
  },
  {
    accessorKey: "saves",
    header: "Сохранения",
  },
  {
    accessorKey: "profileVisits",
    header: "Посещения",
  },
  {
    accessorKey: "reposts",
    header: "Репосты",
  },
  {
    accessorKey: "videoViews",
    header: "Просм. видео",
  },
  {
    accessorKey: "countPosts",
    header: "Постов",
  },
  {
    accessorKey: "price_usd",
    header: "Цена $",
    enableSorting: false,
    cell: ({ getValue }) => formatUSD(+(getValue() as string)),
  },
  {
    accessorKey: "price_rub",
    header: "Цена ₽",
    enableSorting: false,
    cell: ({ getValue }) => formatRUB(+(getValue() as string)),
  },
];
