<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    dimensions?: AllValues;
}>();

const width = computed(() => (props.dimensions?.width ?? 10) * 100);
const height = computed(() => (props.dimensions?.height ?? 7) * 100);
const depth = computed(() => (props.dimensions?.depth ?? 12) * 100);

const dAngle = Math.PI / 6;
const dx = computed(() => depth.value * Math.cos(dAngle));
const dy = computed(() => depth.value * Math.sin(dAngle));

const wAngle = Math.PI / 5;
const wx = computed(() => width.value * Math.cos(wAngle));
const wy = computed(() => width.value * Math.sin(wAngle));

</script>
<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="17"
        class="iconify iconify--mdi icon"
        :viewBox="`0 0 ${dx + wx} ${dy + wy + height}`"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        role="img"
    >
        <polygon
            class="back-base"
            :points="`${dx},${height} ${dx+wx},${height+wy} ${wx},${height+dy+wy} 0,${dy+height}`"
        />
        <polygon
            class="back-main"
            :points="`${dx},0 ${dx+wx},${wy} ${dx+wx},${wy+height} ${dx},${height}`"
        />
        <polygon
            class="back-side"
            :points="`0,${dy} ${dx},0 ${dx},${height} 0,${dy+height}`"
        />
        <polygon
            class="front-side"
            :points="`${wx},${dy+wy} ${wx+dx},${wy} ${wx+dx},${wy+height} ${wx},${dy+wy+height}`"
        />
        <polygon
            class="front-main"
            :points="`0,${dy} ${wx},${dy+wy} ${wx},${dy+wy+height} 0,${dy+height}`"
        />
    </svg>
</template>

<style scoped>
svg {
    stroke: currentColor;
    fill: none;
}
.back-base {
    fill: var(--cube-back-base);
}
.back-main {
    fill: var(--cube-back-main);
}
.back-side {
    fill: var(--cube-back-side);
}
.front-side {
    fill: var(--cube-front-side);
}
.front-main {
    fill: var(--cube-front-main);
}
</style>
