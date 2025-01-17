import "./RemarkModal.css";
import { FC, useState } from "react";
import { ModalWrapper } from "@ui/ModalWrapper/ModalWrapper";
import { userInfoApi } from "@Admin/pages/UserInfo/_userInfoApi";
import { Button } from "@mui/material";

type Props = {
  shownModal: boolean;
  onClose: VoidFunction;
  remarkData?: string;
  userId: number;
  refetchUserRemark: VoidFunction;
};

export const RemarkModal: FC<Props> = ({
  shownModal,
  onClose,
  remarkData,
  userId,
  refetchUserRemark,
}) => {
  const [remark, setRemark] = useState<string>(remarkData || "");
  const [updateUserRemark] = userInfoApi.useUpdateUserRemarkMutation();

  const handleClickSaveNClose = async () => {
    if (remark === remarkData) return _onCloseClearInput();
    await updateUserRemark({ id: userId, remark });
    refetchUserRemark();
    _onCloseClearInput();
  };

  const _onCloseClearInput = () => {
    setRemark(remark);
    onClose();
  };

  return (
    <ModalWrapper shown={shownModal} onClose={_onCloseClearInput}>
      <div className="user-info__remark-modal">
        Примечание:
        <textarea
          className="remark-modal__textaria"
          maxLength={150}
          defaultValue={remark}
          onChange={(e) => setRemark(e.target.value)}
          spellCheck={false}
        />
        <Button
          variant="contained"
          className="remark-modal__button"
          onClick={handleClickSaveNClose}
        >
          Сохранить
        </Button>
      </div>
    </ModalWrapper>
  );
};
