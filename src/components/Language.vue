<script setup lang="ts">
import { computed, ref } from 'vue';
import {
    languages,
    locale,
    supportedLocales,
    setLocale,
} from '@/i18n';

const open = ref(false);

const currentLanguage = computed(() => {
    const key = locale.value;

    return languages[key];
});

function select(lang: Locale) {
    open.value = !setLocale(lang);
}

</script>
<template>
    <div>
        <div
            class="language-selected"
            @click="open = !open"
        >
            {{ currentLanguage }}
        </div>
        <ul v-if="open"
            class="language-list"
        >
            <li v-for="localeKey of supportedLocales"
                :class="{
                    'language-item': true,
                    selected: localeKey === locale,
                }"
                :key="`locale--${localeKey}`"
                @click="select(localeKey)"
            >
                {{ languages[localeKey] }}
            </li>
        </ul>
    </div>
</template>

<style scoped>
.language-selected,
.language-item {
    cursor: pointer;
    background-color: var(--color-background-soft);
}

.selected {
    background-color: var(--color-brand-primary);
}

.language-selected {
    text-align: right;
}

.language-item {
    padding: 5px;
}

.language-list {
    list-style-type: none;
    padding: 0;
}
</style>
