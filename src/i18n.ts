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
    [ 'remove this saved item', {
        en: 'remove this saved item',
        fr: 'supprimer cette sauvegarde',
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
    ['Paper width', {
        en: '',
        fr: 'Largeur du papier',
    }],
    ['Paper height', {
        en: '',
        fr: 'Hauteur du papier',
    }],
    ['Volume', {
        en: '',
        fr: 'Volume',
    }],
    ['Masu box', {
        en: '',
        fr: 'Boîte Masu',
    }],
    ['lid box', {
        en: 'Lid box',
        fr: 'Boîte avec couvercle',
    }],
    ['lid oversize (to close correctly)', {
        en: 'Overlapping of the lid (for proper closure)',
        fr: 'Chevauchement du couvercle (pour une fermeture correcte)',
    }],
    ['lid split (%)', {
        en: 'lid split (%)',
        fr: 'Séparation du couvercle (%)',
    }],
    ['V card holder', {
        en: 'V card holder',
        fr: 'Porte-carte en V',
    }],
    ['Kata divider', {
        en: '',
        fr: 'Diviseur Kata',
    }],
    ['First insert', {
        en: '',
        fr: 'Premier espace',
    }],
    ['Second insert', {
        en: '',
        fr: 'Deuxième espace',
    }],
    ['Third insert', {
        en: '',
        fr: 'Troisième espace',
    }],
    ['Cards holder', {
        en: '',
        fr: 'Range Carte',
    }],
    ['Band height', {
        en: '',
        fr: 'Hauteur de la bande',
    }],
    ['Overlapping', {
        en: '',
        fr: 'Superposition',
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
