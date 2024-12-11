import "./ServiceActive.css";
import { FC } from "react";
import { userHomeApi } from "@User/pages/Home/_homeApi";
import Countdown, { zeroPad } from "react-countdown";
import { ActivatedService, CustomPackageUser, Timer } from "@User/utils/types";
import { pluralize, remainingTime } from "@utils/utils";

const renderTimer = ({ days, hours, minutes, seconds }: Timer) => (
  <span>
    {" "}
    {days} {pluralize(Number(zeroPad(days)), ["день", "дня", "дней"])}{" "}
    {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
  </span>
);

type Props = {
  activeService: ActivatedService;
  customPack?: CustomPackageUser[];
};

export const ServiceActive: FC<Props> = ({ activeService, customPack }) => {
  const { data: packageList } = userHomeApi.useGetPackageListQuery();

  const currentPackageLike = activeService.packageId
    ? packageList?.[activeService.packageId - 1]?.likes
    : customPack && customPack[0].likes;

  return (
    <>
      <div className="service-active__container">
        {!currentPackageLike ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="service-active__title">Активированный Сервис</div>
            <div className="service-active__card-list">
              <div className="service-active__card">
                <p>Количество лайков</p>
                <p>{currentPackageLike}</p>
              </div>
              <div className="service-active__card">
                <p>Количество просмотров</p>
                <p>
                  {activeService.customPackageId && customPack
                    ? customPack[0].videoViews
                    : currentPackageLike * 3}
                </p>
              </div>
              <div className="service-active__card">
                <p>Количество постов</p>
                <p>{activeService.countPosts}</p>
              </div>
              <div className="service-active__card">
                <p>Оставшееся время</p>
                <Countdown
                  date={Date.now() + remainingTime(activeService.createdAt)}
                  renderer={renderTimer}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
