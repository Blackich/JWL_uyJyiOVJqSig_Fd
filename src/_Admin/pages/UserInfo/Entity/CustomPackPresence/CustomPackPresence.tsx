import "./CustomPackPresence.css";
import { FC, useState } from "react";
import { User } from "@Admin/utils/types";
import { userInfoApi } from "@Admin/pages/UserInfo/_userInfoApi";
import { formatRUB, formatUSD } from "@/utils/utils";
import { DropdownBtn } from "@ui/Dropdown/DropdownBtn";
import { AlertMessage } from "@ui/AlertMessage/AlertMessage";

type Props = {
  userInfo: User;
};

export const CustomPackPresence: FC<Props> = ({ userInfo }) => {
  const [isOpenAlertSuccess, setOpenAlertSuccess] = useState<boolean>(false);
  const [isOpenAlertError, setOpenAlertError] = useState<boolean>(false);

  const { data: customPackageUser } =
    userInfoApi.useGetCustomPackageByUserIdQuery(Number(userInfo.id));
  const [deleteCustomPack] =
    userInfoApi.useDeleteCustomPackageByUserIdMutation();

  const onClickDeleteCustomPack = async () => {
    await deleteCustomPack(Number(userInfo.id)).then((res) => {
      if (res?.data) return setOpenAlertSuccess(true);
      if (res?.error) return setOpenAlertError(true);
    });
  };

  if (customPackageUser?.length === 0) {
    return (
      <div className="main-block--custom-pack-presence">
        <div className="no-custom-pack-presence">
          У пользователя нет кастомного пакета.
        </div>
      </div>
    );
  }

  return (
    <div className="main-block--custom-pack-presence">
      {customPackageUser &&
        customPackageUser.map((pack) => (
          <div
            className="custom-pack-presence__details"
            key={pack.price_rub}
          >
            <span>
              {pack.likes}&nbsp;<p>Лайки</p>
            </span>
            <span>
              {pack.reach}&nbsp;<p>Охват</p>
            </span>
            <span>
              {pack.saves}&nbsp;<p>Сохранения</p>
            </span>
            <span>
              {pack.profileVisits}&nbsp;<p>Посещения</p>
            </span>
            <span>
              {pack.reposts}&nbsp;<p>Репосты</p>
            </span>
            <span>
              {pack.videoViews}&nbsp;<p>Просмотры видео</p>
            </span>
            <span>
              {pack.countPosts}&nbsp;<p>Постов</p>
            </span>
            <span>{formatUSD(pack.price_usd)}</span>
            <span>{formatRUB(pack.price_rub)}</span>
            <DropdownBtn
              menuItemArray={["Удалить"]}
              className="custom-pack-presence__dropdown"
              menuItemOnClick={[onClickDeleteCustomPack]}
            />
          </div>
        ))}

      <AlertMessage
        message="Кастомный пакет успешно удален"
        type="success"
        isOpen={isOpenAlertSuccess}
        onClose={() => setOpenAlertSuccess(false)}
      />
      <AlertMessage
        message="Не удалось удалить кастомный пакет"
        type="error"
        isOpen={isOpenAlertError}
        onClose={() => setOpenAlertError(false)}
      />
    </div>
  );
};
