<script setup lang="ts">
import additionalArrows, { clear } from '../additionalArrowsStore';
import Arrow from './Arrow.vue';

/* Reset additional rows when changing plan */
clear();

</script>
<template>
    <g>
        <Arrow v-for="arrow of additionalArrows"
            :key="arrow.value.id"
            :x="arrow.value.x"
            :x2="arrow.value.x2"
            :y="arrow.value.y"
            :y2="arrow.value.y2"
            :text="arrow.value.text"
            :reverseOffset="arrow.value.reverseOffset"
            :level="arrow.value.level"
        />
    </g>
</template>

<style scoped>

</style>
