<script setup lang="ts">
import { computed, defineEmits, ref, watch } from 'vue';
import { displayNumber } from '@/helpers';

const props = defineProps<{
    value: number;
    disabled: boolean;
}>();

const emit = defineEmits<{
    change: [number];
    input: [number];
}>();


const currentValue = ref(0);

const reactivePropValue = computed(() => props.value || 0);
const disabled = computed(() => props.disabled || false);

watch(reactivePropValue, () => {
    currentValue.value = props.value;
}, ({ immediate: true }));

function setValue(evt: Event, forceReset = false): number {
    let value = parseFloat((evt.currentTarget as HTMLInputElement).value) || 0;

    if (forceReset) {
        if (value < 0) {
            value = 0;
        } else
            if (value > 100) {
                value = 100;
            }
    }

    currentValue.value = value;
    return value;
}

function onChange(evt: Event) {
    const value = setValue(evt, true);
    emit('change', value);
}

function onInput(evt: Event) {
    const value = setValue(evt, false);
    emit('input', value);
}

</script>

<template>
    <div class="range-input">
        <input
            class="range-input__range"
            type="range"
            min="0"
            max="100"
            :value="currentValue"
            :disabled="disabled"
            @change="onChange"
            @input="onInput"
        />
        <input
            class="range-input__input"
            type="number"
            min="0"
            max="100"
            :value="displayNumber(currentValue)"
            :disabled="disabled"
            @change="onChange"
            @input="onInput"
        />
        %
    </div>
</template>

<style scoped>
.range-input {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    justify-content: space-between;
}

.range-input__range {
    flex: 3;
}
.range-input__input {
    flex: 1;
}

</style>
