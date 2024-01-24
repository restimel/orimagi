<script setup lang="ts">
import { computed } from 'vue';
import Arrow from './Arrow.vue';

import * as plan from './plan';

const props = defineProps<{
    dimensions: AllValues;
}>();

const page = plan.page(props);
const properties = plan.properties(props);

const ready = computed(() => {
    const dimensions = props.dimensions;
    return [
        dimensions.height,
        dimensions.width,
        dimensions.depth,
        page.pWidth,
        page.pHeight,
    ].every((val) => Number.isFinite(val));
});

const cosSin45 = 1 / Math.SQRT2;

function getCoord(value: number): number {
    return 500 + (value || 0) * page.ratio * cosSin45;
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
                :x2="page.pWidth"
                :y2="0"
                :text="page.paperWidth"
            />
            <Arrow
                :x="0"
                :y="page.pHeight"
                :x2="0"
                :y2="0"
                :text="page.paperHeight"
            />

            <rect
                class="page"
                x="0" y="0" :width="page.pWidth" :height="page.pHeight"
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
                :cx="getCoord(-properties.width / 2)"
                :cy="getCoord(-properties.width / 2)"
                :r="5"
            />
            <circle
                class="point"
                :cx="getCoord(-(properties.width / 2 + properties.height))"
                :cy="getCoord(-(properties.width / 2 + properties.height))"
                :r="5"
            />
            <circle
                class="point"
                :cx="getCoord(-(properties.width / 2 + properties.height * 2))"
                :cy="getCoord(-(properties.width / 2 + properties.height * 2))"
                :r="5"
            />

            <circle
                class="point"
                :cx="getCoord(properties.width / 2)"
                :cy="getCoord(properties.width / 2)"
                :r="5"
            />
            <circle
                class="point"
                :cx="getCoord((properties.width / 2 + properties.height))"
                :cy="getCoord((properties.width / 2 + properties.height))"
                :r="5"
            />
            <circle
                class="point"
                :cx="getCoord((properties.width / 2 + properties.height * 2))"
                :cy="getCoord((properties.width / 2 + properties.height * 2))"
                :r="5"
            />

            <circle
                class="point"
                :cx="getCoord(-properties.depth / 2)"
                :cy="getCoord(properties.depth / 2)"
                :r="5"
            />
            <circle
                class="point"
                :cx="getCoord(-(properties.depth / 2 + properties.height))"
                :cy="getCoord((properties.depth / 2 + properties.height))"
                :r="5"
            />
            <circle
                class="point"
                :cx="getCoord(-(properties.depth / 2 + properties.height * 2))"
                :cy="getCoord((properties.depth / 2 + properties.height * 2))"
                :r="5"
            />

            <circle
                class="point"
                :cx="getCoord(properties.depth / 2)"
                :cy="getCoord(-properties.depth / 2)"
                :r="5"
            />
            <circle
                class="point"
                :cx="getCoord((properties.depth / 2 + properties.height))"
                :cy="getCoord(-(properties.depth / 2 + properties.height))"
                :r="5"
            />
            <circle
                class="point"
                :cx="getCoord((properties.depth / 2 + properties.height * 2))"
                :cy="getCoord(-(properties.depth / 2 + properties.height * 2))"
                :r="5"
            />
        </g>
        <g>
            <Arrow
                :x="getCoord(-properties.width / 2)"
                :y="getCoord(-properties.width / 2)"
                :x2="500"
                :y2="500"
                :text="properties.width / 2"
            />
            <Arrow
                :x="getCoord(-(properties.width / 2 + properties.height))"
                :y="getCoord(-(properties.width / 2 + properties.height))"
                :x2="getCoord(-(properties.width / 2))"
                :y2="getCoord(-(properties.width / 2))"
                :text="properties.height"
            />
            <Arrow
                :x="getCoord(-(properties.width / 2 + properties.height * 2))"
                :y="getCoord(-(properties.width / 2 + properties.height * 2))"
                :x2="getCoord(-(properties.width / 2 + properties.height))"
                :y2="getCoord(-(properties.width / 2 + properties.height))"
                :text="properties.height"
            />
        </g>
        <g>
            <Arrow
                :x="getCoord(-properties.depth / 2)"
                :y="getCoord(properties.depth / 2)"
                :x2="500"
                :y2="500"
                :text="properties.depth / 2"
            />
            <Arrow
                :x="getCoord(-(properties.depth / 2 + properties.height))"
                :y="getCoord((properties.depth / 2 + properties.height))"
                :x2="getCoord(-(properties.depth / 2))"
                :y2="getCoord((properties.depth / 2))"
                :text="properties.height"
            />
            <Arrow
                :x="getCoord(-(properties.depth / 2 + properties.height * 2))"
                :y="getCoord((properties.depth / 2 + properties.height * 2))"
                :x2="getCoord(-(properties.depth / 2 + properties.height))"
                :y2="getCoord((properties.depth / 2 + properties.height))"
                :text="properties.height"
            />
        </g>
    </svg>
</template>

<style scoped>
</style>
