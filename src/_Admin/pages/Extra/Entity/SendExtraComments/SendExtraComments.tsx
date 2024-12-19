import "./SendExtraComments.css";
import { FC, useState } from "react";
import { Button, TextField } from "@mui/material";
import { checkStartsWithInst } from "@utils/utils";
import { extraApi } from "@Admin/pages/Extra/_extraApi";
import { InputComment } from "@ui/InputComment/InputComment";
import { AlertMessage } from "@ui/AlertMessage/AlertMessage";

type Props = {
  extraId: number;
  extraServiceId: number;
  invaldateExtra: VoidFunction;
  invaldateExtraTable: VoidFunction;
};

export const SendExtraComments: FC<Props> = ({
  extraId,
  extraServiceId,
  invaldateExtra,
  invaldateExtraTable,
}) => {
  const [link, setLink] = useState<string>("");
  const [count, setCount] = useState<number>(0);
  const [processedLines, setProcessedLines] = useState<string[]>([]);
  const [isOpenAlertError, setOpenAlertError] = useState<boolean>(false);
  const [isOpenAlertSuccess, setOpenAlertSuccess] = useState<boolean>(false);

  const [sendExtraComments] = extraApi.useSendExtraCommentsMutation();

  const handleLinesProcessed = (lines: string[]) => {
    setProcessedLines(lines);
  };

  const isDisabledSendBtn = (): boolean => {
    if (count === 0) return true;
    if (!checkStartsWithInst(link)) return true;
    return false;
  };

  const handleSendComments = async () => {
    if (!checkStartsWithInst(link) || count === 0) return;
    await sendExtraComments({
      extraId,
      extraServiceId,
      comments: processedLines,
      link,
    }).then((res) => {
      if (res?.data) {
        invaldateExtraTable();
        invaldateExtra();
        setOpenAlertSuccess(true);
        return;
      }
      if (res?.error) return setOpenAlertError(true);
    });
  };

  return (
    <div className="extra-service-comments">
      <TextField
        label="Ссылка"
        variant="outlined"
        onChange={(e) => setLink(e.target.value)}
      />
      <InputComment
        count={count}
        bg={"#F8F8F8"}
        setCount={setCount}
        onLinesProcessed={handleLinesProcessed}
      />
      <Button
        variant="contained"
        sx={{ width: "100%" }}
        onClick={handleSendComments}
        disabled={isDisabledSendBtn()}
      >
        Отправить
      </Button>
      <AlertMessage
        isOpen={isOpenAlertSuccess}
        onClose={() => setOpenAlertSuccess(false)}
        type="success"
        message="Комментарии успешно отправлены"
      />
      <AlertMessage
        isOpen={isOpenAlertError}
        onClose={() => setOpenAlertError(false)}
        type="error"
        message="Комментарии не отправлены"
      />
    </div>
  );
};
