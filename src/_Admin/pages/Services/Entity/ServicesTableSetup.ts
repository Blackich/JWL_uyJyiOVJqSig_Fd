import { ColumnDef } from "@tanstack/react-table";
import { daysUntilFutureDate } from "@/utils/utils";

export const servicesColumns: ColumnDef<unknown>[] = [
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
    accessorKey: "likes",
    header: "Пакет",
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
