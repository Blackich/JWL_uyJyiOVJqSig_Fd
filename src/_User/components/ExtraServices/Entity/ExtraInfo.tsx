import { t } from "i18next";

export const ExtraInfo = ({ serviceId }: { serviceId: number }) => {
  return (
    <div className="extra-services__info">
      {t("extra_services.activation_info")}
      {serviceId === 2 && (
        <div className="extra-services__warning-text">
          {t("extra_services.view_story_warn")}
        </div>
      )}
    </div>
  );
};
