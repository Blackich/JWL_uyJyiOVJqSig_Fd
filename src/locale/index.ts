import HomeEn from "./translations/en/en._Home.json";
import ExtraEn from "./translations/en/en._Extra.json";
import alertEn from "./translations/en/en.alert.json";
import footerEn from "./translations/en/en.footer.json";
import headerEn from "./translations/en/en.header.json";
import modalEn from "./translations/en/en.modal.json";

import HomeRu from "./translations/ru/ru._Home.json";
import ExtraRu from "./translations/ru/ru._Extra.json";
import alertRu from "./translations/ru/ru.alert.json";
import footerRu from "./translations/ru/ru.footer.json";
import headerRu from "./translations/ru/ru.header.json";
import modalRu from "./translations/ru/ru.modal.json";

export const translations = {
  en: {
    ...HomeEn,
    ...ExtraEn,
    ...headerEn,
    ...footerEn,
    ...modalEn,
    ...alertEn,
  },
  ru: {
    ...HomeRu,
    ...ExtraRu,
    ...headerRu,
    ...footerRu,
    ...modalRu,
    ...alertRu,
  },
};
