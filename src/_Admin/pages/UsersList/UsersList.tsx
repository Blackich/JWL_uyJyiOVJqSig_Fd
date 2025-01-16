import "./UsersList.css";
import { formatDate } from "@utils/utils";
import { usersListApi } from "./_usersListApi";
import { ColumnDef } from "@tanstack/react-table";
import { Table } from "@Admin/components/Table/Table";
import { MainBlock } from "@Admin/components/MainBlock/MainBlock";
// import { AddUserBlock } from "./Entity/AddUserBlock/AddUserBlock";

export const UsersList = () => {
  const { data: usersList } = usersListApi.useGetUsersQuery();
  return (
    <>
      <MainBlock title={"Пользователи"}>
        <div className="main-block--users-list">
          {/* <AddUserBlock /> */}
          {usersList && (
            <Table
              tableData={usersList}
              navigateUrl={"/panel/users"}
              columnsSetup={usersColumns}
              initialSort={[{ id: "id", desc: true }]}
            />
          )}
        </div>
      </MainBlock>
    </>
  );
};

const usersColumns: ColumnDef<unknown>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "createdAt",
    header: "Создан",
    cell: ({ getValue }) => formatDate(getValue() as string),
  },
];
