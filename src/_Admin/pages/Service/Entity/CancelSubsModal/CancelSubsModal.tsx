import "./CancelSubsModal.css";
import { FC } from "react";
import { Button } from "@mui/material";
import { ModalWrapper } from "@ui/ModalWrapper/ModalWrapper";
import { serviceApi } from "@Admin/pages/Service/_serviceApi";

type Props = {
  serviceId: number;
  shownModal: boolean;
  onClose: VoidFunction;
  refetchStatusSubs: VoidFunction;
};

export const CancelSubsModal: FC<Props> = ({
  serviceId,
  shownModal,
  onClose,
  refetchStatusSubs,
}) => {
  const [cancelAllSubs] = serviceApi.useLazyCancelAllSubsQuery();

  const handleCancelSubsNClose = async () => {
    await cancelAllSubs(serviceId);
    refetchStatusSubs();
    onClose();
  };

  return (
    <ModalWrapper shown={shownModal} onClose={onClose}>
      <div className="service-info__cancel-modal">
        <span>
          Вы действительно хотите <b style={{ color: "red" }}>Отменить</b> все
          подписки?
        </span>
        <Button
          variant="contained"
          className="cancel-modal__button"
          sx={{ backgroundColor: "red" }}
          onClick={handleCancelSubsNClose}
        >
          Отменить
        </Button>
      </div>
    </ModalWrapper>
  );
};
