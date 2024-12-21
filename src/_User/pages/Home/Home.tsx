import "./Home.css";
import { skipToken } from "@reduxjs/toolkit/query";
import { ServiceDescription } from "@User/components/ServiceDescription/ServiceDescription";
import { SocialAccountList } from "@User/components/SocialAccountList/SocialAccountList";
import { ServiceActive } from "@User/components/ServiceActive/ServiceActive";
import { CardList } from "@User/components/CardList/CardList";
import { Page } from "@User/components/Page/Page";
import { userHomeApi } from "./_homeApi";
import { Description } from "@User/components/Description/Description";
import {
  packageDefinitions as packDefs,
  serviceDefinitions as servDefs,
} from "./HomeData";
import { useTranslation } from "react-i18next";
import { CustomPackage } from "@User/components/CustomPackage/CustomPackage";
import { useAppSelector } from "@store/store";
import { getSocialAccId, getUserId } from "@User/auth/_user.slice";

export const Home = () => {
  const { i18n } = useTranslation();
  const pickedAccId = useAppSelector(getSocialAccId);
  const userId = useAppSelector(getUserId);

  const { data: activeServices } = userHomeApi.useGetActiveServiceQuery(
    userId || skipToken,
  );
  const { data: customPack } = userHomeApi.useGetCustomPackDetailsByUserIdQuery(
    userId || skipToken,
  );

  const matchIds = activeServices?.find(
    (service) => service.socialNicknameId === pickedAccId,
  );

  return (
    <>
      <Page>
        <div className="container home-container">
          <div className="social-acc-info">
            <div className="social-acc-info__inst">
              <SocialAccountList />
            </div>
            <div className="social-acc-info__description">
              {i18n.language === "ru" ? (
                <Description title={packDefs.titleRu} text={packDefs.textRu} />
              ) : (
                <Description title={packDefs.titleEn} text={packDefs.textEn} />
              )}
            </div>
          </div>
          {activeServices && activeServices.length > 0 && matchIds ? (
            <div className="service-active">
              <ServiceActive activeService={matchIds} customPack={customPack} />
            </div>
          ) : (
            <div className="card-list">
              <CardList />
            </div>
          )}
          {customPack && customPack?.length > 0 && !matchIds && (
            <div className="custom-package-user__container">
              <CustomPackage customPack={customPack} />
            </div>
          )}
          <div className="service-description__container">
            {i18n.language === "ru"
              ? servDefs.map((service, i) => (
                  <ServiceDescription
                    key={i}
                    logo={service.logo}
                    title={service.titleRu}
                    text={service.textRu}
                    className={service.className}
                  />
                ))
              : servDefs.map((service, i) => (
                  <ServiceDescription
                    key={i}
                    logo={service.logo}
                    title={service.titleEn}
                    text={service.textEn}
                    className={service.className}
                  />
                ))}
          </div>
        </div>
      </Page>
    </>
  );
};
