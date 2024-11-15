import { ColumnDef } from "@tanstack/react-table";

export const customPackageColumns: ColumnDef<unknown>[] = [
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
    accessorKey: "shares",
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
    header: "Цена (usd)",
    enableSorting: false,
  },
  {
    accessorKey: "price_rub",
    header: "Цена (rub)",
    enableSorting: false,
  },
];
