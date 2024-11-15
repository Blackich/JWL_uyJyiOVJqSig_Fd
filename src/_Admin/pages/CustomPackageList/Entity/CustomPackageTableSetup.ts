import { ColumnDef } from "@tanstack/react-table";

export const customPackageColumns: ColumnDef<unknown>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "likes",
    header: "Лайки",
    enableSorting: false,
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
    accessorKey: "shares",
    header: "Репосты",
    enableSorting: false,
  },
  {
    accessorKey: "videoViews",
    header: "Просм. видео",
    enableSorting: false,
  },
  {
    accessorKey: "countPosts",
    header: "Постов",
    enableSorting: false,
  },
  {
    accessorKey: "price_rub",
    header: "Цена (rub)",
    enableSorting: false,
  },
  {
    accessorKey: "price_usd",
    header: "Цена (usd)",
    enableSorting: false,
  },
];