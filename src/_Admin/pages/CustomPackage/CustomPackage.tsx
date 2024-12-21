import "./CustomPackage.css";
import { useParams } from "react-router-dom";
import { MainBlock } from "@Admin/components/MainBlock/MainBlock";
import { usersListApi } from "@Admin/pages/UsersList/_usersListApi";
import { customPackageApi } from "./_customPackageApi";
import { CustomPackageCard } from "./Entity/CustomPackageCard/CustomPackageCard";
import { UserAddition } from "./Entity/UserAddition/UserAddition";

export const CustomPackage = () => {
  const { id } = useParams();
  const { data: usersList } = usersListApi.useGetUsersQuery();
  const { data: customPackageDetails } =
    customPackageApi.useGetCustomPackageDetailsByIdQuery(Number(id));

  return (
    <MainBlock title={`Пакет ${id}`}>
      <div className="main-block--custom-package">
        {customPackageDetails && (
          <CustomPackageCard customPackageDetails={customPackageDetails} />
        )}
        {usersList && (
          <UserAddition usersList={usersList} customPackageId={Number(id)} />
        )}
      </div>
    </MainBlock>
  );
};
