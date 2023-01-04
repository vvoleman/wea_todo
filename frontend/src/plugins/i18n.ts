import { createI18n } from 'vue-i18n'

// Translations
import cs from '@/translations/cs.js'
import en from '@/translations/en.js'

let messages = {
    cs: cs,
    en: en,
}

const i18n = createI18n({
    locale: 'cs', // set locale
    fallbackLocale: 'en', // set fallback locale
    globalInjection: true,
    messages, // set locale messages
    // If you need to specify other options, you can set other options
    // ...
})

export default i18n