import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "../locales/en.json";
import prs from "../locales/prs.json";
import pus from "../locales/pus.json";

const resources = {
  en: { translation: en },
  prs: { translation: prs }, // Dari (Afghan Persian)
  pus: { translation: pus }, // Pashto
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

// Automatically update HTML dir and lang attributes on language change
i18n.on("languageChanged", (lng) => {
  const isRtl = lng === "prs" || lng === "pus";
  document.documentElement.dir = isRtl ? "rtl" : "ltr";
  document.documentElement.lang = lng;
});
export default i18n;