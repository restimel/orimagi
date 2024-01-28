<script setup lang="ts">
const depth = 5
const width = 17
const height = width;

const dAngle = Math.PI / 6;
const dx = depth * Math.cos(dAngle);
const dy = depth * Math.sin(dAngle);

const wAngle = Math.PI / 5;
const wx = width * Math.cos(wAngle);
const wy = width * Math.sin(wAngle);

</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="17"
    class="iconify iconify--mdi"
    :viewBox="`0 0 ${dx + wx} ${dy + wy + height}`"
    preserveAspectRatio="xMidYMid meet"
    aria-hidden="true"
    role="img"
  >
    <polygon
        class="back-main"
        :points="`${dx},0 ${dx+wx},${wy} ${dx+wx},${wy+height} ${dx},${height}`"
    />
    <polygon
        class="back-side"
        :points="`${dx},0 ${dx},${height} 0,${height+dy} 0,${dy}`"
    />
    <polygon
        class="front-flip1"
        :points="`${wx},${dy+wy} ${wx},${dy+wy+height} 0,${dy+height}`"
    />
    <polygon
    class="front-side"
    :points="`${dx+wx},${wy} ${dx+wx},${height+wy} ${wx},${height+dy+wy} ${wx},${dy+wy}`"
    />
    <polygon
        class="front-flip2"
        :points="`0,${dy} ${wx},${dy+wy+width} 0,${dy+width}`"
    />
  </svg>
</template>

<style scoped>
svg {
    stroke: currentColor;
    fill: none;
}

.back-main {
    fill: darkgrey;
}
.back-side {
    fill: darkgrey;
}
.front-side {
    fill: white;
}
.front-flip1 {
    fill: lightgray;
}
.front-flip2 {
    fill: white;
}
</style>
