import { computed, ref } from 'vue';
import dictionary from './dictionary';

export const supportedLocales: Locale[] = [
    'en',
    'fr',
];

export const languages: Record<Locale, string> = {
    en: '🇬🇧 English',
    fr: '🇫🇷 Français',
};

const dict = dictionary;

const currentLocale = ref<Locale>('fr');

export const locale = computed<Locale>(() => currentLocale.value);

export function setLocale(locale: Locale): boolean {
    let finalLocale: Locale = locale;
    let hasBeenChanged = true;

    if (!supportedLocales.includes(finalLocale)) {
        const bestLocale = supportedLocales.find((localeName) => finalLocale.startsWith(localeName))

        if (!bestLocale) {
            finalLocale = supportedLocales[0];
            hasBeenChanged = false;
        } else {
            finalLocale = bestLocale;
        }
    }

    currentLocale.value = finalLocale;

    return hasBeenChanged;
}

const i18n = computed(() => {
    const locale = currentLocale.value;

    return (key: string) => {
        const value = dict.get(key)?.[locale];
        const isString = typeof value === 'string';

        if (!(isString && value)) {
            if (!isString) {
                console.warn('missing translation for "%s"', key);
            }

            return key;
        }

        return value;
    };
});

export default i18n;

function initialize() {
    const languages = navigator.languages ?? [navigator.language];

    languages.some((lang) => setLocale((lang as any).toLowerCase()));
}

initialize();
