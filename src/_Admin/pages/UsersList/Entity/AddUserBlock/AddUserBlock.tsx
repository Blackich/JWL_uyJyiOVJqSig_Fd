import "./AddUserBlock.css";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@store/store";
import { getEmployeeId } from "@Admin/auth/_auth.slice";
import { AlertMessage } from "@ui/AlertMessage/AlertMessage";
import { usersListApi } from "@Admin/pages/UsersList/_usersListApi";

export const AddUserBlock = () => {
  const dispatch = useDispatch();
  const employeeId = useAppSelector(getEmployeeId);

  const [isOpenAlertSuccess, setOpenAlertSuccess] = useState<boolean>(false);
  const [isOpenAlertError, setOpenAlertError] = useState<boolean>(false);
  const [isDisableAddButton, setDisableAddButton] = useState<boolean>(false);

  const invaldateUsersTable = () =>
    dispatch(usersListApi.util.invalidateTags(["UserList"]));
  const [createUser] = usersListApi.useCreateUserMutation();

  const handlClickAddUser = async () => {
    if (!employeeId) return;
    setDisableAddButton(true);
    await createUser(employeeId).then((res) => {
      if (res?.data) {
        invaldateUsersTable();
        setOpenAlertSuccess(true);
      }
      if (res?.error) return setOpenAlertError(true);
    });
  };

  useEffect(() => {
    if (isDisableAddButton === false) return;
    const timer = setTimeout(() => {
      setDisableAddButton(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [isDisableAddButton]);

  return (
    <>
      <div className="users-list__add-user">
        <Button
          variant="contained"
          onClick={handlClickAddUser}
          disabled={isDisableAddButton}
        >
          Добавить пользователя
        </Button>
      </div>
      <AlertMessage
        isOpen={isOpenAlertSuccess}
        onClose={() => setOpenAlertSuccess(false)}
        type="success"
        message="Пользователь успешно добавлен"
      />
      <AlertMessage
        isOpen={isOpenAlertError}
        onClose={() => setOpenAlertError(false)}
        type="error"
        message="Ошибка при создании пользователя"
      />
    </>
  );
};
