import "./CustomPackage.css";
import { useState } from "react";
import { MainBlock } from "@Admin/components/MainBlock/MainBlock";
import { TextField } from "@mui/material";
import { packageApi } from "../Packages/_packageApi";

export const CustomPackage = () => {
  const { data: packageDetails } = packageApi.useGetPackageDetailsQuery();
  const [customPackData, setCustomPackData] = useState({
    likes: 1000,
    reach: 2000,
    saves: 100,
    profileVisits: 100,
    reposts: 100,
    videoViews: 3000,
  });

  const handleChangeCustomPackData = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    setCustomPackData({ ...customPackData, [e.target.name]: e.target.value });
  };

  return (
    <MainBlock title={"Кастомные пакеты"}>
      <div className="main-block--custom-packages">
        <div className="custom-package">
          <TextField
            label="Лайков"
            name="likes"
            type="number"
            required
            value={customPackData.likes}
            onChange={(e) => handleChangeCustomPackData(e)}
          />
          <TextField
            label="Охват"
            name="reach"
            type="number"
            required
            value={customPackData.reach}
            onChange={(e) => handleChangeCustomPackData(e)}
          />
          <TextField
            label="Сохранения"
            name="saves"
            type="number"
            value={customPackData.saves}
            onChange={(e) => handleChangeCustomPackData(e)}
          />
          <TextField
            label="Посещения профиля"
            name="profileVisits"
            type="number"
            value={customPackData.profileVisits}
            onChange={(e) => handleChangeCustomPackData(e)}
          />
          <TextField
            label="Репосты"
            name="reposts"
            type="number"
            value={customPackData.reposts}
            onChange={(e) => handleChangeCustomPackData(e)}
          />
          <TextField
            label="Просмотры видео"
            name="videoViews"
            type="number"
            required
            value={customPackData.videoViews}
            onChange={(e) => handleChangeCustomPackData(e)}
          />
          <div className="package-details__container">
            {packageDetails &&
              packageDetails.map((pack_details) => (
                <div style={{ marginTop: "10px" }} key={pack_details.id}>
                  {pack_details.id}.{" "}
                  {pack_details.siteId === 1 ? "Venro" : "JustPanel"}{" "}
                  {pack_details.serviceId} {pack_details.typeService}{" "}
                  {pack_details.price}
                </div>
              ))}
          </div>
        </div>
      </div>
    </MainBlock>
  );
};
