import { computed, ref } from 'vue';

export type Locale = 'en' | 'fr';
export type I18nItem = Record<Locale, string>;

export const supportedLocales: Locale[] = [
    'en',
    'fr',
];

export const languages = {
    en: '🇬🇧 English',
    fr: '🇫🇷 Français',
};

const dict: Map<string, I18nItem> = new Map<string, I18nItem>([
    [ 'save', {
        en: 'save',
        fr: 'enregistrer',
    }],
    [ 'saved name', {
        en: 'saved name',
        fr: 'nom de la sauvegarde',
    }],
    ['Width', {
        en: '',
        fr: 'Longueur',
    }],
    ['Depth', {
        en: '',
        fr: 'Profondeur',
    }],
    ['Height', {
        en: '',
        fr: 'Hauteur',
    }],
    ['Lip size', {
        en: '',
        fr: 'Taille du rebord',
    }],
    ['Margin', {
        en: '',
        fr: 'Marge',
    }],
    ['Properties', {
        en: '',
        fr: 'Propriétés',
    }],
    ['Dimensions', {
        en: '',
        fr: 'Dimensions',
    }],
]);

const currentLocale = ref<Locale>('fr');

export const locale = computed(() => currentLocale.value);

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

        if (!value || typeof value !== 'string') {
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
