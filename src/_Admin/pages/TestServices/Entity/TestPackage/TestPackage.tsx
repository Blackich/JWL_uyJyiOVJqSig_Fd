import "./TestPackage.css";
import { ChangeEvent, useState } from "react";
import { useAppSelector } from "@/store/store";
import { checkStartsWithInst } from "@/utils/utils";
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
  const [inputLink, setInputLink] = useState<string>("");

  const handleChangeSelect = (e: SelectChangeEvent) => {
    setTestServiceId(e.target.value as string);
  };
  const handleChangeInputLink = (e: ChangeEvent<HTMLInputElement>) => {
    setInputLink(e.target.value as string);
  };

  const handleSubmitTestPackage = async () => {
    if (!employeeId || !inputLink || !testServiceId) return;
    const serviceId = Number(testServiceId);
    await sendTestPackage({
      testServiceId: serviceId,
      employeeId,
      link: inputLink,
    }).then((res) => {
      if (res?.data) setOpenAlertSuccess(true);
      if (res?.error) setOpenAlertError(true);
    });
    setInputLink("");
    setTestServiceId("");
  };
  return (
    <div className="test-services__test-package">
      <FormControl fullWidth>
        <InputLabel>Выберите пакет</InputLabel>
        <Select
          value={testServiceId}
          label="Выберите пакет"
          onChange={handleChangeSelect}
        >
          <MenuItem value={1}>Пакет на пост</MenuItem>
          <MenuItem value={2}>Пакет на видео</MenuItem>
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
        disabled={!checkStartsWithInst(inputLink) || !testServiceId}
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
