<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    dimensions?: AllValues;
}>();

const width = computed(() => (props.dimensions?.width ?? 10) * 100);
const height = computed(() => (props.dimensions?.height ?? 7) * 100);
const depth = computed(() => (props.dimensions?.depth ?? 15) * 100);
const lidCover = computed(() => {
    const ratio = props.dimensions?.ratio;

    if (ratio === undefined) {
        return 600;
    }

    return ratio * depth.value / 100;
});

const dAngle = Math.PI / 6;
const dx = computed(() => depth.value * Math.cos(dAngle));
const dy = computed(() => depth.value * Math.sin(dAngle));
const lcx = computed(() => lidCover.value * Math.cos(dAngle));
const lcy = computed(() => lidCover.value * Math.sin(dAngle));

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
        class="lid-main"
        :points="`0,${dy} ${dx},0 ${dx+wx},${wy} ${wx},${wy+dy}`"
    />
    <polygon
        class="lid-cover"
        :points="`${dx-lcx},${lcy} ${dx},0 ${dx+wx},${wy} ${wx+dx-lcx},${wy+lcy}`"
    />
    <polygon
        class="front-side"
        :points="`${wx},${wy+dy} ${wx+dx},${wy} ${wx+dx},${wy+height} ${wx},${wy+dy+height}`"
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
.lid-main {
    fill: var(--cube-front-top-alt);
}
.lid-cover {
    fill: var(--cube-front-top);
}
.front-side {
    fill: var(--cube-front-side);
}
.front-main {
    fill: var(--cube-front-main);
}
</style>
