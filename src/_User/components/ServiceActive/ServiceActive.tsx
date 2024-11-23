import "./ServiceActive.css";
import { FC } from "react";
import { userHomeApi } from "@User/pages/Home/_homeApi";
import Countdown, { zeroPad } from "react-countdown";
import { ActivatedService, CustomPackageUser, Timer } from "@User/utils/types";
import { pluralize, remainingTime } from "@/utils/utils";

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

export const ServiceInfo: FC<Props> = ({ activeService, customPack }) => {
  const { data: packageList } = userHomeApi.useGetPackageListQuery();

  const currentPackageLike = activeService.packageId
    ? packageList?.[activeService.packageId - 1]?.likes
    : customPack && customPack[0].likes;

  return (
    <>
      <div className="service-active">
        {!currentPackageLike ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="service-active__main">
              <p>Активирован пакет {currentPackageLike}</p>
              <p>На каждый пост вы получаете:</p>
              <p>{currentPackageLike} лайков</p>
              <p>
                {activeService.customPackageId && customPack
                  ? customPack[0].videoViews
                  : currentPackageLike * 3}{" "}
                просмотров
              </p>
              <p>А так же репосты, подписки и охват</p>
              <p>Количество оставшихся постов: {activeService.countPosts}</p>
              <p>
                Осталось:{" "}
                <Countdown
                  date={Date.now() + remainingTime(activeService.createdAt)}
                  renderer={renderTimer}
                />
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
};
