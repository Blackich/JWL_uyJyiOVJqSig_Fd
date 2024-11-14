import { Dashboard } from "../Dashboard/Dashboard";
import "./Sidebar.css";

export const Sidebar = () => {
  return (
    <>
      <aside className="panel__sidebar">
        <div className="panel__sidebar-logo__container">
          <div className="panel__sidebar__logo"></div>
        </div>
        <Dashboard />
      </aside>
    </>
  );
};
