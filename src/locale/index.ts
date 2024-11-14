import HomeEn from "./translations/en/en._Home.json";
import headerEn from "./translations/en/en.header.json";
import modalEn from "./translations/en/en.modal.json";
import alertEn from "./translations/en/en.alert.json";

import HomeRu from "./translations/ru/ru._Home.json";
import headerRu from "./translations/ru/ru.header.json";
import modalRu from "./translations/ru/ru.modal.json";
import alertRu from "./translations/ru/ru.alert.json";

export const translations = {
  en: { ...HomeEn, ...headerEn, ...modalEn, ...alertEn },
  ru: { ...HomeRu, ...headerRu, ...modalRu, ...alertRu },
};
