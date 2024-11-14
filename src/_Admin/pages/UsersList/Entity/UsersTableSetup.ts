import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/utils/utils";

export const usersColumns: ColumnDef<unknown>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "token",
    header: "Token",
    enableSorting: false,
  },
  {
    accessorKey: "status",
    header: "Статус",
  },
  {
    accessorKey: "createdAt",
    header: "Создан",
    cell: ({ getValue }) => formatDate(getValue() as string),
  },
  {
    accessorKey: "fullName",
    header: "Приглашен",
  },
  {
    accessorKey: "remark",
    header: "Примечание",
    enableSorting: false,
  },
];
