import "./ErrorModal.css";
import { t } from "i18next";
import { ErrorModalWrapper } from "./ErrorModalWrapper";
import {
  ExtraServicesDisabledSVG,
  NoUserSVG,
  PackageServicesDisabledSVG,
  ServicesUnavailableSVG,
} from "@User/utils/svg/HomeSvg";

type Props = {
  shown: boolean;
  onClose: VoidFunction;
};

export const NoUserError = ({ shown, onClose }: Props) => {
  return (
    <ErrorModalWrapper
      shown={shown}
      onClose={onClose}
      errorImage={<NoUserSVG />}
      title={t("modal.payment_error_no_acc_title")}
      text={t("modal.payment_error_no_acc_text")}
    />
  );
};
export const TechnicalProblems = ({ shown, onClose }: Props) => {
  return (
    <ErrorModalWrapper
      shown={shown}
      onClose={onClose}
      errorImage={<ServicesUnavailableSVG />}
      title={t("modal.payment_error_external_services_title")}
      text={t("modal.payment_error_external_services_text")}
    />
  );
};

export const DisabledPackage = ({ shown, onClose }: Props) => {
  return (
    <ErrorModalWrapper
      shown={shown}
      onClose={onClose}
      errorImage={<PackageServicesDisabledSVG />}
      title={t("modal.payment_error_package_disabled_title")}
      text={t("modal.payment_error_package_disabled_text")}
    />
  );
};

export const DisabledExtraServices = ({ shown, onClose }: Props) => {
  return (
    <ErrorModalWrapper
      shown={shown}
      onClose={onClose}
      errorImage={<ExtraServicesDisabledSVG />}
      title={t("modal.payment_error_extra_disabled_title")}
      text={t("modal.payment_error_extra_disabled_text")}
    />
  );
};
