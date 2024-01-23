<script setup lang="ts">
import { computed } from 'vue';
import Arrow from './Arrow.vue';

const props = defineProps<{
    dimensions: AllValues;
}>();

const paperWidth = computed(() => props.dimensions['Paper width'] || 0);
const paperHeight = computed(() => props.dimensions['Paper height'] || 0);

const ratio = computed(() => {
    const width = paperWidth.value;
    const height =  paperHeight.value;

    return  Math.min(1000 / width, 1000 / height, 1e12) || 1e-15;
});
const pWidth = computed(() => {
    return paperWidth.value * ratio.value || 0;
});
const pHeight = computed(() => {
    return paperHeight.value * ratio.value || 0;
});

const ready = computed(() => {
    const dimensions = props.dimensions;
    return [
        dimensions.height,
        dimensions.width,
        dimensions.depth,
        pWidth.value,
        pHeight.value,
    ].every((val) => Number.isFinite(val));
});

const cosSin45 = 1 / Math.SQRT2;

function getCoord(value: number): number {
    return 500 + (value || 0) * ratio.value * cosSin45;
}
</script>
<template>
    <svg
        v-if="ready"
        class="origami"
        xmlns="http://www.w3.org/2000/svg"

        viewBox="-100 -100 1200 1200"
    >
        <g>
            <Arrow
                :x="0"
                :y="0"
                :x2="pWidth"
                :y2="0"
                :text="paperWidth"
            />
            <Arrow
                :x="0"
                :y="pHeight"
                :x2="0"
                :y2="0"
                :text="paperHeight"
            />

            <rect
                class="page"
                x="0" y="0" :width="pWidth" :height="pHeight"
            />
        </g>
        <g class="diagonal">
            <path
                class="mark"
                d="M0,0 L1000,1000"
            />
            <path
                class="mark"
                d="M1000,0 L0,1000"
            />
        </g>
        <g>
            <circle
                class="point"
                :cx="getCoord(-props.dimensions.width / 2)"
                :cy="getCoord(-props.dimensions.width / 2)"
                :r="5"
            />
            <circle
                class="point"
                :cx="getCoord(-(props.dimensions.width / 2 + props.dimensions.height))"
                :cy="getCoord(-(props.dimensions.width / 2 + props.dimensions.height))"
                :r="5"
            />
            <circle
                class="point"
                :cx="getCoord(-(props.dimensions.width / 2 + props.dimensions.height * 2))"
                :cy="getCoord(-(props.dimensions.width / 2 + props.dimensions.height * 2))"
                :r="5"
            />

            <circle
                class="point"
                :cx="getCoord(props.dimensions.width / 2)"
                :cy="getCoord(props.dimensions.width / 2)"
                :r="5"
            />
            <circle
                class="point"
                :cx="getCoord((props.dimensions.width / 2 + props.dimensions.height))"
                :cy="getCoord((props.dimensions.width / 2 + props.dimensions.height))"
                :r="5"
            />
            <circle
                class="point"
                :cx="getCoord((props.dimensions.width / 2 + props.dimensions.height * 2))"
                :cy="getCoord((props.dimensions.width / 2 + props.dimensions.height * 2))"
                :r="5"
            />

            <circle
                class="point"
                :cx="getCoord(-props.dimensions.depth / 2)"
                :cy="getCoord(props.dimensions.depth / 2)"
                :r="5"
            />
            <circle
                class="point"
                :cx="getCoord(-(props.dimensions.depth / 2 + props.dimensions.height))"
                :cy="getCoord((props.dimensions.depth / 2 + props.dimensions.height))"
                :r="5"
            />
            <circle
                class="point"
                :cx="getCoord(-(props.dimensions.depth / 2 + props.dimensions.height * 2))"
                :cy="getCoord((props.dimensions.depth / 2 + props.dimensions.height * 2))"
                :r="5"
            />

            <circle
                class="point"
                :cx="getCoord(props.dimensions.depth / 2)"
                :cy="getCoord(-props.dimensions.depth / 2)"
                :r="5"
            />
            <circle
                class="point"
                :cx="getCoord((props.dimensions.depth / 2 + props.dimensions.height))"
                :cy="getCoord(-(props.dimensions.depth / 2 + props.dimensions.height))"
                :r="5"
            />
            <circle
                class="point"
                :cx="getCoord((props.dimensions.depth / 2 + props.dimensions.height * 2))"
                :cy="getCoord(-(props.dimensions.depth / 2 + props.dimensions.height * 2))"
                :r="5"
            />
        </g>
        <g>
            <Arrow
                :x="getCoord(-props.dimensions.width / 2)"
                :y="getCoord(-props.dimensions.width / 2)"
                :x2="500"
                :y2="500"
                :text="props.dimensions.width / 2"
            />
            <Arrow
                :x="getCoord(-(props.dimensions.width / 2 + props.dimensions.height))"
                :y="getCoord(-(props.dimensions.width / 2 + props.dimensions.height))"
                :x2="getCoord(-(props.dimensions.width / 2))"
                :y2="getCoord(-(props.dimensions.width / 2))"
                :text="props.dimensions.height"
            />
            <Arrow
                :x="getCoord(-(props.dimensions.width / 2 + props.dimensions.height * 2))"
                :y="getCoord(-(props.dimensions.width / 2 + props.dimensions.height * 2))"
                :x2="getCoord(-(props.dimensions.width / 2 + props.dimensions.height))"
                :y2="getCoord(-(props.dimensions.width / 2 + props.dimensions.height))"
                :text="props.dimensions.height"
            />
        </g>
        <g>
            <Arrow
                :x="getCoord(-props.dimensions.depth / 2)"
                :y="getCoord(props.dimensions.depth / 2)"
                :x2="500"
                :y2="500"
                :text="props.dimensions.depth / 2"
            />
            <Arrow
                :x="getCoord(-(props.dimensions.depth / 2 + props.dimensions.height))"
                :y="getCoord((props.dimensions.depth / 2 + props.dimensions.height))"
                :x2="getCoord(-(props.dimensions.depth / 2))"
                :y2="getCoord((props.dimensions.depth / 2))"
                :text="props.dimensions.height"
            />
            <Arrow
                :x="getCoord(-(props.dimensions.depth / 2 + props.dimensions.height * 2))"
                :y="getCoord((props.dimensions.depth / 2 + props.dimensions.height * 2))"
                :x2="getCoord(-(props.dimensions.depth / 2 + props.dimensions.height))"
                :y2="getCoord((props.dimensions.depth / 2 + props.dimensions.height))"
                :text="props.dimensions.height"
            />
        </g>
    </svg>
</template>

<style scoped>
</style>
