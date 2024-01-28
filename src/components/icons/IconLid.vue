<script setup lang="ts">
const width = 10
const height = 7
const depth = 15
const lidCover = 6


const dAngle = Math.PI / 6;
const dx = depth * Math.cos(dAngle);
const dy = depth * Math.sin(dAngle);
const lcx = lidCover * Math.cos(dAngle);
const lcy = lidCover * Math.sin(dAngle);

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
    fill: lightgrey;
}
.lid-cover {
    fill: #e3e3e3;
}
.front-side {
    fill: #ececec;
}
.front-main {
    fill: white;
}
</style>
