import "./PaymentModal.css";
import { FC } from "react";
import { ModalData } from "./type";
import { useAppSelector } from "@store/store";
import { useTranslation } from "react-i18next";
import { skipToken } from "@reduxjs/toolkit/query";
import { systemsIndex } from "./Entity/PaymentSystems";
import { summaryIndex } from "./Entity/PaymentSummary";
import { userHomeApi } from "@User/pages/Home/_homeApi";
import { ModalWrapper } from "@ui/ModalWrapper/ModalWrapper";
import { getSocialAccId, getUserId } from "@User/auth/_user.slice";
import { NoUserError, TechnicalProblems } from "./Entity/Error/ErrorModal";

type Props = {
  shownModal: boolean;
  onClose: VoidFunction;
  modalId: number;
  modalData: ModalData;
};

export const PaymentModal: FC<Props> = ({
  shownModal,
  onClose,
  modalId,
  modalData,
}) => {
  const { t } = useTranslation();
  const SummaryToRender = summaryIndex[modalId] as FC<ModalData>;
  const SystemsToRender = systemsIndex[modalId] as FC<ModalData>;

  const pickedAccId = useAppSelector(getSocialAccId);
  const userId = useAppSelector(getUserId);

  const { data: activeServices } = userHomeApi.useGetActiveServiceQuery(
    userId || skipToken,
  );
  const matchedService = activeServices?.find(
    (service) => service.socialNicknameId === pickedAccId,
  );
  const { data: checkStatusExternalServices } =
    userHomeApi.useCheckStatusExternalServicesQuery();

  if (modalId === 0 && (!pickedAccId || matchedService)) {
    return <NoUserError shown={shownModal} onClose={onClose} />;
  }

  if (!checkStatusExternalServices) {
    return <TechnicalProblems shown={shownModal} onClose={onClose} />;
  }

  return (
    <ModalWrapper shown={shownModal} onClose={onClose}>
      <div className="payment-modal">
        {t("modal.payment_package_title")}
        <div className="payment-modal__wrapper">
          <div className="payment-modal__summary">
            {t("modal.payment_package_subtitle")}
            <SummaryToRender {...modalData} />
          </div>
          <SystemsToRender {...modalData} />
        </div>
      </div>
    </ModalWrapper>
  );
};
