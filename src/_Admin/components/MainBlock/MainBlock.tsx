import "./MainBlock.css";
import { FC } from "react";
import { AdminHeader } from "../Header/AdminHeader";
import { Typography } from "@mui/material";
import { Sidebar } from "../Sidebar/Sidebar";

type Props = {
  title: string;
  children: React.ReactNode;
};

export const MainBlock: FC<Props> = ({ title, children }) => {
  return (
    <>
      <div className="panel__container">
        <Sidebar />
        <main className="panel__main">
          <AdminHeader />
          <div className="panel__main-block">
            <div className="panel__main-block__title">
              <Typography variant="h3" color="black" fontWeight="bold">
                {title}
              </Typography>
            </div>
            <div className="panel__main-block__content">{children}</div>
          </div>
        </main>
      </div>
    </>
  );
};
