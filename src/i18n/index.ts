import { use } from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en";
import zhTW from "./zh_TW";

let initLang = "zh-TW";

const resources = {
  en: { translation: en },
  "zh-TW": { translation: zhTW },
};

use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: initLang,
    fallbackLng: initLang,
    keySeparator: ".",
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });
