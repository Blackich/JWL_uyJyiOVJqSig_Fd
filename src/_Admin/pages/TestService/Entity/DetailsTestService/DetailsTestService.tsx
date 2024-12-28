import "./DetailsTestService.css";
import { ChangeEvent, FC, useState } from "react";
import { useAppSelector } from "@/store/store";
import { checkStartsWithInst } from "@utils/utils";
import { getEmployeeId } from "@Admin/auth/_auth.slice";
import { AlertMessage } from "@ui/AlertMessage/AlertMessage";
import { testServiceApi } from "@/_Admin/pages/TestService/_testServiceApi";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { InputComment } from "@/ui/InputComment/InputComment";

type Props = {
  testServiceId: string;
  setTestServiceId: (testServiceId: string) => void;
};

export const DetailsTestService: FC<Props> = ({
  testServiceId,
  setTestServiceId,
}) => {
  const employeeId = useAppSelector(getEmployeeId);
  const [sendTestPackage] = testServiceApi.useSendTestPackageMutation();

  const [isOpenAlertSuccess, setOpenAlertSuccess] = useState<boolean>(false);
  const [isOpenAlertError, setOpenAlertError] = useState<boolean>(false);
  const [processedLines, setProcessedLines] = useState<string[]>([]);
  const [countComments, setCountComments] = useState<number>(0);
  const [testSpeedId, setTestSpeedId] = useState<string>("");
  const [inputLink, setInputLink] = useState<string>("");

  const handleLinesProcessed = (lines: string[]) => {
    setProcessedLines(lines);
  };
  const handleChangeService = (e: SelectChangeEvent) => {
    setTestServiceId(e.target.value);
  };
  const handleChangeSpeed = (e: SelectChangeEvent) => {
    setTestSpeedId(e.target.value);
  };
  const handleChangeInputLink = (e: ChangeEvent<HTMLInputElement>) => {
    setInputLink(e.target.value);
  };

  const isNeededSpeedValue = (): boolean => {
    const serviceId = Number(testServiceId);
    if (serviceId === 4 || serviceId === 5) return false;
    return true;
  };

  const isDisabledBtnCondition = (): boolean => {
    const serviceId = Number(testServiceId);
    const speedId = Number(testSpeedId);
    if (!(serviceId === 4 || serviceId === 5) && speedId === 0) return true;
    if (serviceId === 5 && countComments !== 10) return true;
    if (!checkStartsWithInst(inputLink)) return true;
    if (!employeeId) return true;
    return false;
  };

  const handleSubmitTestPackage = async () => {
    if (!employeeId || !inputLink || !testServiceId) return;
    const serviceId = Number(testServiceId);
    const speed = Number(testSpeedId);
    await sendTestPackage({
      speed: speed || 4,
      employeeId,
      link: inputLink,
      testServiceId: serviceId,
      comments: processedLines,
    }).then((res) => {
      if (res?.data) setOpenAlertSuccess(true);
      if (res?.error) setOpenAlertError(true);
    });
    setInputLink("");
    setTestServiceId("");
    setTestSpeedId("");
  };

  return (
    <div className="test-services__test-details">
      <FormControl fullWidth>
        <InputLabel>Выберите тест</InputLabel>
        <Select
          value={testServiceId}
          label="Выберите тест"
          onChange={handleChangeService}
        >
          <MenuItem value={1}>На пост (500)</MenuItem>
          <MenuItem value={2}>На видео (500)</MenuItem>
          <MenuItem value={3}>Подписчики (100)</MenuItem>
          <MenuItem value={4}>Просмотры Story (100)</MenuItem>
          <MenuItem value={5}>Комментарии (10)</MenuItem>
        </Select>
      </FormControl>

      {isNeededSpeedValue() && (
        <FormControl fullWidth>
          <InputLabel>Скорость</InputLabel>
          <Select
            value={testSpeedId}
            label="Скорость"
            onChange={handleChangeSpeed}
          >
            <MenuItem value={1}>1 час</MenuItem>
            <MenuItem value={2}>2 часа</MenuItem>
            <MenuItem value={3}>3 часа</MenuItem>
            <MenuItem value={4}>Макс.</MenuItem>
          </Select>
        </FormControl>
      )}

      <TextField
        label="Ссылка на пост или видео"
        value={inputLink}
        onChange={handleChangeInputLink}
      />

      {Number(testServiceId) === 5 && (
        <div className="test-services__comment">
          <InputComment
            bg={"#F8F8F8"}
            count={countComments}
            setCount={setCountComments}
            onLinesProcessed={handleLinesProcessed}
          />
        </div>
      )}

      <Button
        variant="contained"
        style={{ maxWidth: "160px" }}
        onClick={handleSubmitTestPackage}
        disabled={isDisabledBtnCondition()}
      >
        Отправить
      </Button>
      <AlertMessage
        message="Тестовый пакет успешно отправлен"
        type="success"
        isOpen={isOpenAlertSuccess}
        onClose={() => setOpenAlertSuccess(false)}
      />
      <AlertMessage
        message="Не удалось отправить тестовый пакет"
        type="error"
        isOpen={isOpenAlertError}
        onClose={() => setOpenAlertError(false)}
      />
    </div>
  );
};
