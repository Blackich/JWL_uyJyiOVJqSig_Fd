import "./TestPackage.css";
import { ChangeEvent, useState } from "react";
import { useAppSelector } from "@/store/store";
// import { checkStartsWithInst } from "@utils/utils";
import { getEmployeeId } from "@Admin/auth/_auth.slice";
import { AlertMessage } from "@ui/AlertMessage/AlertMessage";
import { testServiceApi } from "@Admin/pages/TestServices/_testServicesApi";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";

export const TestPackage = () => {
  const employeeId = useAppSelector(getEmployeeId);
  const [sendTestPackage] = testServiceApi.useSendTestPackageMutation();

  const [isOpenAlertSuccess, setOpenAlertSuccess] = useState<boolean>(false);
  const [isOpenAlertError, setOpenAlertError] = useState<boolean>(false);
  const [testServiceId, setTestServiceId] = useState("");
  const [testSpeedId, setTestSpeedId] = useState("");
  const [inputLink, setInputLink] = useState<string>("");

  const handleChangeService = (e: SelectChangeEvent) => {
    setTestServiceId(e.target.value as string);
  };
  const handleChangeSpeed = (e: SelectChangeEvent) => {
    setTestSpeedId(e.target.value as string);
  };
  const handleChangeInputLink = (e: ChangeEvent<HTMLInputElement>) => {
    setInputLink(e.target.value as string);
  };

  const handleSubmitTestPackage = async () => {
    if (!employeeId || !inputLink || !testServiceId || !testSpeedId) return;
    const serviceId = Number(testServiceId);
    const speed = Number(testSpeedId);
    console.log(speed);
    await sendTestPackage({
      speed,
      employeeId,
      link: inputLink,
      testServiceId: serviceId,
    }).then((res) => {
      if (res?.data) setOpenAlertSuccess(true);
      if (res?.error) setOpenAlertError(true);
    });
    setInputLink("");
    setTestServiceId("");
    setTestSpeedId("");
  };
  return (
    <div className="test-services__test-package">
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

      <TextField
        label="Ссылка на пост или видео"
        value={inputLink}
        onChange={handleChangeInputLink}
      />

      <Button
        variant="contained"
        style={{ maxWidth: "160px" }}
        onClick={handleSubmitTestPackage}
        // disabled={!checkStartsWithInst(inputLink) || !testServiceId}
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
