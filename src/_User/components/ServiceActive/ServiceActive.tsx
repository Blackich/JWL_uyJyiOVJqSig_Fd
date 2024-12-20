import "./ServiceActive.css";
import { FC } from "react";
import { t } from "i18next";
import { Tooltip } from "@ui/Tooltip/Tooltip";
import Countdown, { zeroPad } from "react-countdown";
import { userHomeApi } from "@User/pages/Home/_homeApi";
import { pluralize, remainingTime } from "@utils/utils";
import { TooltipHelpSVG } from "@User/utils/svg/HomeSvg";
import { ActivatedService, CustomPackageUser, Timer } from "@User/utils/types";
import { useAdaptive } from "@/utils/screenWidth";

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
  const { isDesktop } = useAdaptive();
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
            <div className="service-active__title">
              Активированный Сервис
              <Tooltip
                tooltip={toolTip()}
                postion={isDesktop ? "bottom right" : "bottom left"}
              >
                <TooltipHelpSVG />
              </Tooltip>
            </div>
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

const toolTip = () => {
  return (
    <>
      <p>{t("card.etc")}</p>
      <p>+ {t("card.reach")}</p>
      <p>+ {t("card.profile_visits")}</p>
      <p>+ {t("card.impressions")}</p>
      <p>+ {t("card.reposts")}</p>
      <p>+ {t("card.saves")}</p>
    </>
  );
};
