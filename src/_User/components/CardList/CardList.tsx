import "./CardList.css";
import { useState } from "react";
import { PostQuantity } from "@User/components/PostQuantity/PostQuantity";
import { userHomeApi } from "@User/pages/Home/_homeApi";
import { useAdaptive } from "@utils/screenWidth";
import { cardListAddClass } from "./CardListData";
import { PackageDetailsUser } from "@User/utils/types";
import { Card, SkeletonCard } from "@User/components/Card/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export const CardList = () => {
  const { isDesktop } = useAdaptive();
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const { data: packageDetails } = userHomeApi.useGetPackageDetailsQuery();
  const cardList = cardListAddClass(packageDetails as PackageDetailsUser[]);

  return (
    <>
      <PostQuantity activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      {cardList ? (
        <div className="carousel">
          <Swiper
            modules={[Pagination, EffectCoverflow, Autoplay]}
            // spaceBetween={100}
            pagination={{ clickable: true }}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            // centerInsufficientSlides={true}
            loop={true}
            slidesPerView={isDesktop ? 3 : 1}
            // autoplay={{
            //   delay: 3000,
            //   disableOnInteraction: false,
            //   pauseOnMouseEnter: true,
            // }}
            // slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 0,
              // modifier: 1,
              slideShadows: false,
              // scale: 0.8,
            }}
            className="swiper_container"
          >
            {cardList?.length && activeIndex === 1
              ? cardList.map((card) => (
                  <SwiperSlide key={card.id}>
                    <Card
                      likes={card.likes}
                      activeIndex={activeIndex}
                      className={card.className}
                      priceRUB={card.price_rub_15}
                      priceUSD={card.price_usd_15}
                    />
                  </SwiperSlide>
                ))
              : cardList.map((card) => (
                  <SwiperSlide key={card.id}>
                    <Card
                      likes={card.likes}
                      activeIndex={activeIndex}
                      className={card.className}
                      priceRUB={card.price_rub_30}
                      priceUSD={card.price_usd_30}
                    />
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>
      ) : (
        <div className="carousel-skeleton">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      )}
    </>
  );
};
