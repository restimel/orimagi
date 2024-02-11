import { locale } from '@/i18n';

export function displayNumber(value: number, i18nFormat = false): string {
    const precision = 1000;
    const newValue = Math.round(value * precision) / precision;

    if (i18nFormat) {
        return newValue.toLocaleString(locale.value);
    }

    return newValue.toString(10);
}
