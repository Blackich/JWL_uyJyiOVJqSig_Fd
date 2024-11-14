import "./ServiceActive.css";
import { FC } from "react";
import { userHomeApi } from "@User/pages/Home/_homeApi";
import Countdown, { zeroPad } from "react-countdown";
import { ActivatedService, Timer } from "@User/utils/types";
import { pluralize, remainingTime } from "@/utils/utils";
import { Card } from "@User/components/Card/Card";

const renderTimer = ({ days, hours, minutes, seconds }: Timer) => (
  <span>
    {" "}
    {days} {pluralize(Number(zeroPad(days)), ["день", "дня", "дней"])}{" "}
    {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
  </span>
);

type Props = {
  activeService: ActivatedService;
};

export const ServiceInfo: FC<Props> = ({ activeService }) => {
  const { data: packageList } = userHomeApi.useGetPackageListQuery();
  const currentPackageLike = packageList?.[activeService.packageId - 1]?.likes;

  return (
    <>
      <div className="service-active">
        <Card priceUSD={100} priceRUB={200} likes={200} className="one" activeIndex={1}/>
        {!currentPackageLike ? (
          <p>Loading...</p>
        ) : (
          <>
            <p> У вас активирован пакет {currentPackageLike}</p>
            <p>На каждый пост вы получаете</p>
            <p>{currentPackageLike} лайков</p>
            <p>{currentPackageLike * 3} просмотров</p>
            <p>Количество постов: {activeService.countPosts}</p>
            <p>
              Осталось:{" "}
              <Countdown
                date={Date.now() + remainingTime(activeService.createdAt)}
                renderer={renderTimer}
              />
            </p>
          </>
        )}
      </div>
    </>
  );
};
