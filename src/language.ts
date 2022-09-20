import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import backend from "i18next-xhr-backend";
import { initReactI18next } from "react-i18next";

const fallbackLng = ['es'];
const availableLanguages = ['es'];

i18n
  //.use(detector)
  .use(backend)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    fallbackLng, supportedLngs: availableLanguages,
  });

export default i18n