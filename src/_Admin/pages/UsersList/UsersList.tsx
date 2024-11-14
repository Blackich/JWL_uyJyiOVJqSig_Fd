import "./UsersList.css";
import { MainBlock } from "@Admin/components/MainBlock/MainBlock";
import { Table } from "@Admin/components/Table/Table";
import { usersListApi } from "./_usersListApi";
import { usersColumns } from "./Entity/UsersTableSetup";

export const UsersList = () => {
  const { data: usersList } = usersListApi.useGetUsersQuery();
  return (
    <>
      <MainBlock title={"Пользователи"}>
        <div className="main-block--users-list">
          {usersList && (
            <Table
              tableData={usersList}
              navigateUrl={"/panel/users"}
              columnsSetup={usersColumns}
            />
          )}
        </div>
      </MainBlock>
    </>
  );
};
