<script setup lang="ts">
import { computed, defineEmits, ref } from 'vue';
import _ from '@/i18n';

const props = defineProps<{
    /** List of label to display */
    display: Partial<SettingsDisplay>;
}>();

const emit = defineEmits<{
    /** List of items to display */
    change: [SettingsDisplay];
}>();

const settings = ref<SettingsDisplay>({
    arrow: true,
    cut: true,
    cutLine: true,
    fold: true,
    mark: true,
    page: true,
    point: true,
});

const labels = ref<SettingsLabel>({
    arrow: () => _.value('Arrows'),
    cut: () => _.value('Cut area'),
    cutLine: () => _.value('Cut line'),
    fold: () => _.value('Fold line'),
    mark: () => _.value('Mark line'),
    page: () => _.value('Sheet'),
    point: () => _.value('Reference points'),
});

const displayLabels = computed(() => {
    const list = new Set<SettingsType>(['page']);
    const display = Object.entries(props.display) as Array<[SettingsType, boolean]>;

    display.forEach(([type, value]) => {
        if (value) {
            list.add(type);
        }
    });

    return list;
});

function changeValue(type: SettingsType, value: boolean) {
    settings.value[type] = value;
    emit('change', settings.value);
    save();
}

/* {{{ storage */

const storageKey = 'orimagi-display-details';

function save() {
    const data = JSON.stringify(settings.value);

    localStorage.setItem(storageKey, data);
}

function load() {
    try {
        const rawData = localStorage.getItem(storageKey);

        if (!rawData) {
            return;
        }

        const settingsValue = settings.value;
        const data = JSON.parse(rawData);
        const entries = Object.entries(data) as Array<[SettingsType, boolean]>;
        entries.forEach(([key, value]) => {
            if (key in settingsValue) {
                settingsValue[key] = value;
            }
        });
    } catch {
        console.warn('Failed to restore details');
    }
    emit('change', settings.value);
}

/* }}} */

load();
</script>
<template>
    <fieldset>
        <legend>
            {{ _('Display') }}
        </legend>
        <label v-for="type of displayLabels"
            :key="`origami-settings-${type}`"
        >
            <input
                type="checkbox"
                :checked="settings[type]"
                :disabled="type === 'page'"
                @change="changeValue(type, ($event.currentTarget as HTMLInputElement).checked)"
            >
            {{ labels[type]() }}
        </label>
    </fieldset>
</template>

<style scoped>
fieldset {
    border-radius: 10px;
    margin-bottom: 20px;
}

label {
    display: block;
}
</style>
