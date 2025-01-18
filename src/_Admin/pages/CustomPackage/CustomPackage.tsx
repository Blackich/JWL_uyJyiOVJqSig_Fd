import "./CustomPackage.css";
import { useParams } from "react-router-dom";
import { customPackageApi } from "./_customPackageApi";
import { MainBlock } from "@Admin/components/MainBlock/MainBlock";
import { UserAddition } from "./Entity/UserAddition/UserAddition";
import { CustomPackageCard } from "./Entity/CustomPackageCard/CustomPackageCard";

export const CustomPackage = () => {
  const { id } = useParams();
  const { data: userList } =
    customPackageApi.useGetAllUsersForCustomPackageQuery();
  const { data: customPackageDetails } =
    customPackageApi.useGetCustomPackageDetailsByIdQuery(Number(id));

  return (
    <MainBlock title={`Пакет ${id}`}>
      <div className="main-block--custom-package">
        {customPackageDetails && (
          <CustomPackageCard customPackageDetails={customPackageDetails} />
        )}
        {userList && (
          <UserAddition userList={userList} customPackageId={Number(id)} />
        )}
      </div>
    </MainBlock>
  );
};
