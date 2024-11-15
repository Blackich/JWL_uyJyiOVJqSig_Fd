import { FC } from "react";
import "./PackageInputSetting.css";
import { TextField } from "@mui/material";
import { CustomPackWithoutPrice } from "@Admin/utils/types";

type Props = {
  customPackData: CustomPackWithoutPrice;
  setCustomPackData: (data: CustomPackWithoutPrice) => void;
};

export const PackageInputSetting: FC<Props> = ({
  customPackData,
  setCustomPackData,
}) => {
  const handleChangeCustomPackData = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const value = e.target.value;
    setCustomPackData({
      ...customPackData,
      [e.target.name]: Number(value) > 0 ? Number(value) : 0,
    });
  };
  return (
    <div className="custom-package__settings">
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
      <TextField
        label="Количество постов"
        name="countPosts"
        type="number"
        required
        value={customPackData.countPosts}
        onChange={(e) => handleChangeCustomPackData(e)}
      />
    </div>
  );
};
