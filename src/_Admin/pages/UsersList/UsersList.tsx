import "./UsersList.css";
import { MainBlock } from "@Admin/components/MainBlock/MainBlock";
import { Table } from "@Admin/components/Table/Table";
import { usersListApi } from "./_usersListApi";
import { usersColumns } from "./Entity/UsersTableSetup";
import { AddUserBlock } from "./Entity/AddUserBlock/AddUserBlock";

export const UsersList = () => {
  const { data: usersList } = usersListApi.useGetUsersQuery();
  return (
    <>
      <MainBlock title={"Пользователи"}>
        <div className="main-block--users-list">
          <AddUserBlock />
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
