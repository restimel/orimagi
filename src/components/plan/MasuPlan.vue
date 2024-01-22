<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    dimensions: AllValues;
}>();

const ratio = computed(() => {
    const width = props.dimensions['Paper width'];
    const height =  props.dimensions['Paper height'];

    return  Math.min(1000 / width, 1000/ height) || 1;
});
const pWidth = computed(() => {
    console.log('yep', props.dimensions['Paper width']);
    return props.dimensions['Paper width'] * ratio.value || 0;
});
const pHeight = computed(() => {
    return props.dimensions['Paper height'] * ratio.value || 0;
});

const path = 'M0,0 L1000,1000';
</script>
<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="400px"
        height="400px"
        viewBox="-100 -100 1200 1200"
    >
        <rect x="0" y="0" :width="pWidth" :height="pHeight" />
        <path
            :d="path"
        />
    </svg>
</template>

<style scoped>
svg {
    stroke: currentColor;
    fill: none;
}
</style>
