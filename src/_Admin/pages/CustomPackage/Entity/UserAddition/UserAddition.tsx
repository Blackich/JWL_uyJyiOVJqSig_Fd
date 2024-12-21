import "./UserAddition.css";
import { FC, useState } from "react";
import { Button } from "@mui/material";
import { User } from "@Admin/utils/types";
import { useAppDispatch } from "@store/store";
import { SearchBar } from "@ui/SearchBar/SearchBar";
import { AlertMessage } from "@ui/AlertMessage/AlertMessage";
import { userInfoApi } from "@Admin/pages/UserInfo/_userInfoApi";
import { customPackageApi } from "@Admin/pages/CustomPackage/_customPackageApi";

type Props = {
  usersList: User[];
  customPackageId: number;
};
export const UserAddition: FC<Props> = ({ usersList, customPackageId }) => {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState("");
  const [isAproveValue, setAproveValue] = useState<boolean | null>(null);

  const [isOpenAlertSuccess, setOpenAlertSuccess] = useState<boolean>(false);
  const [isOpenAlertError, setOpenAlertError] = useState<boolean>(false);

  const usersListIds = usersList.map((user) => user.id);

  const [addCustomPackToUser] =
    customPackageApi.useAddCustomPackToUserMutation();
  const invalidateCustomPackPresence = () =>
    dispatch(userInfoApi.util.invalidateTags(["UserInfo"]));

  const handleAddPackToUser = async () => {
    if (!isAproveValue) return;
    await addCustomPackToUser({
      userId: Number(query),
      customPackageId,
    }).then((res) => {
      if (res?.data) {
        invalidateCustomPackPresence();
        setOpenAlertSuccess(true);
        return;
      }
      if (res?.error) return setOpenAlertError(true);
    });
    setQuery("");
    setAproveValue(null);
  };

  return (
    <div className="custom-package__user-addition">
      <SearchBar
        searchData={usersListIds}
        type="number"
        query={query}
        setQuery={setQuery}
        isAproveValue={isAproveValue}
        setAproveValue={setAproveValue}
      />
      <Button
        variant="contained"
        disabled={!isAproveValue}
        onClick={handleAddPackToUser}
      >
        Добавить
      </Button>
      <AlertMessage
        isOpen={isOpenAlertSuccess}
        onClose={() => setOpenAlertSuccess(false)}
        type="success"
        message="Пакет успешно добавлен"
      />
      <AlertMessage
        isOpen={isOpenAlertError}
        onClose={() => setOpenAlertError(false)}
        type="error"
        message="У пользователя уже есть пакет, либо его статус Inactive"
      />
    </div>
  );
};
