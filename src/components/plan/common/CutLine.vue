<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}>();

const ICON_WIDTH = 24;
const ICON_HEIGHT = 36;
const OFFSET_ICON_X = 0;
const OFFSET_ICON_Y = ICON_HEIGHT / 2;

const length = computed(() => {
    return Math.sqrt((props.x2 - props.x1) ** 2 + (props.y2 - props.y1) ** 2) || 0;
});

/** radian */
const angle = computed<number>(() => {
    const x1 = props.x1;
    const y1 = props.y1;
    const x2 = props.x2;
    const y2 = props.y2;
    const PI = Math.PI;
    const hypotenuse = length.value;
    const abscise = Math.abs(x2 - x1);

    if (hypotenuse === 0) {
        return 0;
    }

    let angle: number;

    if (abscise === 0) {
        angle = PI / 2;
    } else {
        angle = Math.acos(abscise / hypotenuse);
    }

    if (y2 < y1) {
        angle = -angle;
    }

    if (x2 < x1) {
        angle = -(angle + PI);
    }

    angle = (angle + 4 * PI) % (2 * PI);

    return angle;
});

const angleDeg = computed<number>(() => {
    return angle.value * 180 / Math.PI;
});

function position(distance: number): Point {
    const alpha = angle.value;

    return [
        props.x1 + Math.cos(alpha) * distance,
        props.y1 + Math.sin(alpha) * distance,
    ];
}

const icon1 = computed<Point>(() => {
    const dist = Math.min(OFFSET_ICON_X + 10, length.value - ICON_WIDTH - OFFSET_ICON_X);

    const pos = position(dist);

    const angleValue = angle.value;
    const offset = [
        Math.cos(angleValue) * OFFSET_ICON_X + Math.sin(angleValue) * OFFSET_ICON_Y,
        Math.sin(angleValue) * OFFSET_ICON_X + Math.cos(angleValue) * OFFSET_ICON_Y,
    ];

    return [
        pos[0] - offset[0],
        pos[1] + offset[1],
    ];
});

const icon2 = computed<Point | null>(() => {
    const dist = length.value - OFFSET_ICON_X - 10;
    const MARGIN = ICON_WIDTH * 1.5;
    const limit = (ICON_WIDTH + OFFSET_ICON_X + MARGIN) * 2

    if (dist < limit) {
        return null;
    }

    const pos = position(dist);

    const PI = Math.PI;
    const angleValue = angle.value + PI;
    const offset = [
        Math.cos(angleValue) * OFFSET_ICON_X + Math.sin(angleValue) * OFFSET_ICON_Y,
        Math.sin(angleValue) * OFFSET_ICON_X + Math.cos(angleValue) * OFFSET_ICON_Y,
    ];

    return [
        pos[0] - offset[0],
        pos[1] + offset[1],
    ];
});

const style = computed<string>(() => {
    return `
        --angle: ${angle.value}rad;
    `;
});

</script>
<template>
    <g class="cut-line">
        <line
            :x1="props.x1"
            :x2="props.x2"
            :y1="props.y1"
            :y2="props.y2"
        />
        <text
            class="svg-icon"
            :x="icon1[0]"
            :y="icon1[1]"
            :style="style"
            :rotate="angleDeg"
        >
            ✂
        </text>
        <text v-if="icon2"
            class="svg-icon"
            :x="icon2[0]"
            :y="icon2[1]"
            :style="style"
            :rotate="angleDeg + 180"
        >
            ✂
        </text>
    </g>
</template>

<style scoped>

</style>
