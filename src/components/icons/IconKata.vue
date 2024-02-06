<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    dimensions?: AllValues;
}>();

const width = computed(() => (props.dimensions?.width ?? 10) * 100);
const height = computed(() => (props.dimensions?.height ?? 7) * 100);
const depth = computed(() => (props.dimensions?.depth ?? 15) * 100);
const insert2 = computed(() => (props.dimensions?.marginA ?? 15) * 100);
const insert3 = computed(() => (props.dimensions?.marginB ?? 0) * 100);

const dAngle = Math.PI / 6;
const i1x = computed(() => depth.value * Math.cos(dAngle));
const i1y = computed(() => depth.value * Math.sin(dAngle));
const i2x = computed(() => insert2.value * Math.cos(dAngle));
const i2y = computed(() => insert2.value * Math.sin(dAngle));
const i3x = computed(() => insert3.value * Math.cos(dAngle));
const i3y = computed(() => insert3.value * Math.sin(dAngle));

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
    :viewBox="`0 0 ${i1x + +i2x + i3x + wx} ${wy + height + i1y + i2y + i3y}`"
    preserveAspectRatio="xMidYMid meet"
    aria-hidden="true"
    role="img"
  >
    <polygon v-if="insert3 > 0"
        class="back-base"
        :points="`${i1x + i2x},${i3y + height} ${i1x + i2x + i3x},${height} ${i1x + i2x + i3x + wx},${height + wy} ${i1x + i2x + wx},${height + wy + i3y}`"
    />
    <polygon
        class="back-base"
        :points="`${i1x},${i2y + i3y + height} ${i1x + i2x},${height + i3y} ${i1x + i2x + wx},${height + wy + i3y} ${i1x + wx},${height + wy + i3y + i2y}`"
    />
    <polygon
        class="back-base"
        :points="`${0},${i1y + i2y + i3y + height} ${i1x},${height + i3y + i2y} ${i1x + wx},${height + wy + i3y + i2y} ${wx},${height + wy + i3y + i2y + i1y}`"
    />

    <polygon v-if="insert3 > 0"
        class="back-side"
        :points="`${i1x + i2x},${i3y} ${i1x + i2x + i3x},${0} ${i1x + i2x + i3x},${height} ${i1x + i2x},${height + i3y}`"
    />
    <polygon
        class="back-side"
        :points="`${i1x},${i3y + i2y} ${i1x + i2x},${i3y} ${i1x + i2x},${height + i3y} ${i1x},${height + i3y + i2y}`"
    />
    <polygon
        class="back-side"
        :points="`${0},${i3y + i2y + i1y} ${i1x},${i3y + i2y} ${i1x},${height + i3y + i2y} ${0},${height + i3y + i2y + i1y}`"
    />

    <polygon v-if="insert3 > 0"
        class="back-main"
        :points="`${i1x + i2x},${i3y} ${i1x + i2x + wx},${i3y + wy} ${i1x + i2x + wx},${height + i3y + wy} ${i1x + i2x},${height + i3y}`"
    />
    <polygon
        class="back-main"
        :points="`${i1x},${i3y + i2y} ${i1x + wx},${i3y + i2y + wy} ${i1x + wx},${height + i2y + i3y + wy} ${i1x},${height + i3y + i2y}`"
    />

    <polygon v-if="insert3 > 0"
        class="front-side"
        :points="`${i1x + i2x + wx},${i3y + wy} ${i1x + i2x + i3x + wx},${wy} ${i1x + i2x + i3x + wx},${height + wy} ${i1x + i2x + wx},${height + i3y + wy}`"
    />
    <polygon
        class="front-side"
        :points="`${i1x + wx},${i3y + i2y + wy} ${i1x + i2x + wx},${i3y + wy} ${i1x + i2x + wx},${height + i3y + wy} ${i1x + wx},${height + i3y + i2y + wy}`"
    />
    <polygon
        class="front-side"
        :points="`${wx},${i3y + i2y + i1y + wy} ${i1x + wx},${i3y + i2y + wy} ${i1x + wx},${height + i3y + i2y + wy} ${wx},${height + i3y + i2y + i1y + wy}`"
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
.back-side {
    fill: var(--cube-back-side);
}
.back-main {
    fill: var(--cube-back-main);
}
.front-side {
    fill: var(--cube-front-side);
}
</style>
