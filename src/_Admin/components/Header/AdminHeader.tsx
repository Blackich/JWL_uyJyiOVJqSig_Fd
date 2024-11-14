import "./AdminHeader.css";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/store";
import { fetchLogout } from "@Admin/auth/_authApi";
import { getAuthName } from "@Admin/auth/_auth.slice";
import { Typography } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

export const AdminHeader = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const name = useAppSelector(getAuthName);

  const handleClickLogout = async () => {
    await dispatch(fetchLogout());
    navigate("/auth/login");
  };

  return (
    <>
      <header className="panel__header">
        {name && (
          <Typography color="black" variant="h5">
            {name}
          </Typography>
        )}
        <button
          onClick={handleClickLogout}
          className="panel__header-logout"
          title="Выйти из аккаунта"
        >
          <ExitToAppIcon color="info" fontSize="large" />
        </button>
      </header>
    </>
  );
};
