import "./DashboardItem.css";
import { FC, ReactElement } from "react";
import { NavLink, useLocation } from "react-router-dom";

type Props = {
  title: string;
  url: string;
  iconActive: ReactElement;
  iconInactive: ReactElement;
};

export const DashboardItem: FC<Props> = ({
  title,
  url,
  iconActive,
  iconInactive,
}) => {
  const { pathname } = useLocation();
  const isActive: boolean = pathname === url;
  return (
    <>
      <NavLink to={url} className="dashboard-item">
        <div
          className={`dashboard-item__in ${
            isActive && "dashboard-item__active"
          }`}
        >
          {isActive ? iconActive : iconInactive}
          <div className="dashboard-item__title">{title}</div>
        </div>
      </NavLink>
    </>
  );
};
