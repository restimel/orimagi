<script setup lang="ts">
import { displayNumber } from '@/helpers';
import { computed } from 'vue';

const props = defineProps<{
    x: number;
    y: number;
    x2: number;
    y2: number;
    text?: number;
    reverseOffset?: boolean;
}>();

const offset = computed(() => props.reverseOffset ? 30 : -30);
const textOffset = computed(() => props.reverseOffset ? 25 : -25);

const length = computed(() => {
    return Math.sqrt((props.x2 - props.x) ** 2 + (props.y2 - props.y) ** 2) || 0;
});

const rotateRad = computed(() => {
    return Math.atan2(props.y2 - props.y, props.x2 - props.x) || 0;
});

const rotate = computed(() => {
    return  rotateRad.value * 180 / Math.PI;
});

const tx = computed(() => {
    return props.x;
});

const ty = computed(() => {
    return props.y;
});

function fValue(value: number | ''): string {
    if (value === '') {
        return '';
    }

    return displayNumber(value, true);
}
</script>
<template>
    <g
        :transform="`translate(${tx}, ${ty}) rotate(${rotate})`"
    >
        <path
            class="arrow"
            :d="`M20,-20 L0,0 20,20 M0,0 L${length},0 M${length - 20},-20 L${length},0 ${length - 20},20`"
            :transform="`translate(0, ${offset})`"
        />
        <text
            class="arrow-label-value"
            :x="length / 2"
            :y="textOffset"
            :transform="`translate(0, ${offset})`"
        >
            {{fValue(props.text ?? '')}}
        </text>
    </g>
</template>

<style scoped>

</style>
