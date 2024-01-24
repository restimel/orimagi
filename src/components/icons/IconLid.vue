<script setup lang="ts">
const mx = 1;
const my = 1;
const w = 11;
const h = 8;
const dx = 7;
const dy = 7;

const top = `M${mx},${my} L${mx+w},${my} ${mx+w+dx},${my+dy} ${mx+dx},${my+dy}z`;
const top2 = `M${mx+dx/2},${my+dy/2} L${mx+dx/2+w},${my+dy/2}`;
const side = `M${mx},${my} L${mx},${my+h} ${mx+dx},${my+h+dy} ${mx+dx},${my+dy}`;
const front = `M${mx+dx+w},${my+dy} L${mx+dx+w},${my+h+dy} ${mx+dx},${my+dy+h}`;
const path = top + top2 + side + front;
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="17"
    class="iconify iconify--mdi"
    viewBox="0 0 24 17"
    preserveAspectRatio="xMidYMid meet"
    aria-hidden="true"
    role="img"
    stoke="currentColor"
    fill="currentColor"
  >
    <path
        stroke="black"
        fill="none"
        :d="path"
    />
  </svg>
</template>

<style scoped></style>
