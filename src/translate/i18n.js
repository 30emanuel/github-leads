import i18n from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector'
import { messages } from './languagens'

i18n.use(LanguageDetector)
    .init({
        debug: false,
        fallbackLng: 'en',
        resources: messages
    })

export {i18n} 