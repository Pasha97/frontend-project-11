import i18next from 'i18next'
import locales from './locales/index'

export const initI18n = () => i18next.init({
    lng: 'ru',
    debug: false,
    resources: {
       ru: locales.ru,
       en: locales.en,
    },
}).then( () => i18next)
