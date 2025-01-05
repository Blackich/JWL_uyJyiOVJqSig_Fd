import "./Dashboard.css";
import { FC } from "react";
import { DashboardItem } from "@Admin/components/DashboardItem/DashboardItem";
import { ListAltSVG, ListAltFilledSVG } from "@Admin/utils/svg/Dashboard";
import WindowIcon from "@mui/icons-material/Window";
import WindowOutlinedIcon from "@mui/icons-material/WindowOutlined";
import PeopleIcon from "@mui/icons-material/People";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import BackpackIcon from "@mui/icons-material/Backpack";
import BackpackOutlinedIcon from "@mui/icons-material/BackpackOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import LocalPostOfficeOutlinedIcon from "@mui/icons-material/LocalPostOfficeOutlined";
import SellIcon from "@mui/icons-material/Sell";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

export const Dashboard: FC = () => {
  return (
    <>
      <div className="panel__sidebar-dashboard__container">
        <div className="panel__sidebar-dashboard__list">
          <DashboardItem
            url="/panel"
            title="Главная"
            iconActive={<WindowIcon />}
            iconInactive={<WindowOutlinedIcon />}
          />
          <DashboardItem
            url="/panel/test-services"
            title="Тестовые услуги"
            iconActive={<LocalPostOfficeIcon />}
            iconInactive={<LocalPostOfficeOutlinedIcon />}
          />
          <DashboardItem
            url="/panel/users"
            title="Пользователи"
            iconActive={<PeopleIcon />}
            iconInactive={<PeopleAltOutlinedIcon />}
          />
          <DashboardItem
            url="/panel/test-services-list"
            title="Отправленные тесты"
            iconActive={<ListAltFilledSVG />}
            iconInactive={<ListAltSVG />}
          />
          <DashboardItem
            url="/panel/services"
            title="Купленные пакеты"
            iconActive={<ShoppingCartIcon />}
            iconInactive={<ShoppingCartOutlinedIcon />}
          />
          <DashboardItem
            url="/panel/extra"
            title="Купленные услуги"
            iconActive={<ShoppingBasketIcon />}
            iconInactive={<ShoppingBasketOutlinedIcon />}
          />
          <DashboardItem
            url="/panel/custom-package"
            title="Кастомные пакеты"
            iconActive={<BackpackIcon />}
            iconInactive={<BackpackOutlinedIcon />}
          />
          <DashboardItem
            url="/panel/custom-package/create"
            title="Добавить пакет"
            iconActive={<AddCircleOutlinedIcon />}
            iconInactive={<AddCircleOutlineOutlinedIcon />}
          />
          <DashboardItem
            url="/panel/package-details"
            title="Пакеты"
            iconActive={<ShoppingBagIcon />}
            iconInactive={<ShoppingBagOutlinedIcon />}
          />
          <DashboardItem
            url="/panel/extra-details"
            title="Доп. услуги"
            iconActive={<SellIcon />}
            iconInactive={<SellOutlinedIcon />}
          />
          <DashboardItem
            url="/panel/general-settings"
            title="Общие настройки"
            iconActive={<SettingsIcon />}
            iconInactive={<SettingsOutlinedIcon />}
          />
        </div>
      </div>
    </>
  );
};
