<script setup lang="ts">
import { computed, defineEmits } from 'vue';
import Arrow from './common/Arrow.vue';
import AdditionalArrows from './common/AdditionalArrows.vue';

import * as plan from './plan';

const props = defineProps<{
    dimensions: AllValues;
}>();
const emit = defineEmits<{
    /** List of detail labels to display */
    labels: [Partial<SettingsDisplay>];
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
    return 500 + value * cosSin45;
}

function getAB(value: number, orientation: boolean): [number, number] {
    const a = orientation ? 1 : -1;
    const y = orientation ? 1000 - value : value;
    const b = y - a * value;

    return [a, b];
}

function getLine(value: number, orientation: boolean): Line {
    const [a, b] = getAB(value, orientation);

    return [
        [0, b],
        [1000, 1000 * a + b],
    ];
}

function intersection(value1: number, value2: number): Point {
    const [a1, b1] = getAB(value1, false);
    const [a2, b2] = getAB(value2, true);

    const x = (b2 - b1) / (a1 - a2);
    const y = a1 * x + b1;

    return [x, y];
}

const point1 = computed(() => {
    const value = -properties.width / 2;
    const valueRatio = value * page.ratio;

    return getCoord(valueRatio) || 0;
});

const point2 = computed(() => {
    const value = -(properties.width / 2 + properties.height);
    const valueRatio = value * page.ratio;

    return getCoord(valueRatio) || 0;
});

const point3 = computed(() => {
    const value = -(properties.width / 2 + properties.height * 2);
    const valueRatio = value * page.ratio;

    return getCoord(valueRatio) || 0;
});

const point1bis = computed(() => {
    const value = properties.width / 2;
    const valueRatio = value * page.ratio;

    return getCoord(valueRatio) || 0;
});

const point2bis = computed(() => {
    const value = properties.width / 2 + properties.height;
    const valueRatio = value * page.ratio;

    return getCoord(valueRatio) || 0;
});

const point3bis = computed(() => {
    const value = properties.width / 2 + properties.height * 2;
    const valueRatio = value * page.ratio;

    return getCoord(valueRatio) || 0;
});

const point4 = computed(() => {
    const value = -properties.depth / 2;
    const valueRatio = value * page.ratio;

    return getCoord(valueRatio) || 0;
});

const point5 = computed(() => {
    const value = -(properties.depth / 2 + properties.height);
    const valueRatio = value * page.ratio;

    return getCoord(valueRatio) || 0;
});

const point6 = computed(() => {
    const value = -(properties.depth / 2 + properties.height * 2);
    const valueRatio = value * page.ratio;

    return getCoord(valueRatio) || 0;
});

const point4bis = computed(() => {
    const value = properties.depth / 2;
    const valueRatio = value * page.ratio;

    return getCoord(valueRatio) || 0;
});

const point5bis = computed(() => {
    const value = properties.depth / 2 + properties.height;
    const valueRatio = value * page.ratio;

    return getCoord(valueRatio) || 0;
});

const point6bis = computed(() => {
    const value = properties.depth / 2 + properties.height * 2;
    const valueRatio = value * page.ratio;

    return getCoord(valueRatio) || 0;
});

emit('labels', {
    arrow: true,
    fold: true,
    foldDetails: true,
    mark: true,
    point: true,
});

</script>
<template>
    <svg
        v-if="ready"
        class="origami"
        xmlns="http://www.w3.org/2000/svg"

        :viewBox="page.viewBox"
    >
        <defs>
            <clipPath id="page">
                <rect
                    class="page"
                    x="0" y="0" :width="page.pWidth" :height="page.pHeight"
                />
            </clipPath>
        </defs>
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
            <line
                class="fold fold valley-fold"
                clip-path="url(#page)"
                :x1="getLine(point1, false)[0][0]"
                :y1="getLine(point1, false)[0][1]"
                :x2="getLine(point1, false)[1][0]"
                :y2="getLine(point1, false)[1][1]"
            />
            <line
                class="fold valley-fold"
                clip-path="url(#page)"
                :x1="getLine(point2, false)[0][0]"
                :y1="getLine(point2, false)[0][1]"
                :x2="getLine(point2, false)[1][0]"
                :y2="getLine(point2, false)[1][1]"
            />
            <line
                class="fold mountain-fold"
                clip-path="url(#page)"
                :x1="getLine(point3, false)[0][0]"
                :y1="getLine(point3, false)[0][1]"
                :x2="getLine(point3, false)[1][0]"
                :y2="getLine(point3, false)[1][1]"
            />
            <line
                class="fold valley-fold"
                clip-path="url(#page)"
                :x1="getLine(point1bis, false)[0][0]"
                :y1="getLine(point1bis, false)[0][1]"
                :x2="getLine(point1bis, false)[1][0]"
                :y2="getLine(point1bis, false)[1][1]"
            />
            <line
                class="fold valley-fold"
                clip-path="url(#page)"
                :x1="getLine(point2bis, false)[0][0]"
                :y1="getLine(point2bis, false)[0][1]"
                :x2="getLine(point2bis, false)[1][0]"
                :y2="getLine(point2bis, false)[1][1]"
            />
            <line
                class="fold mountain-fold"
                clip-path="url(#page)"
                :x1="getLine(point3bis, false)[0][0]"
                :y1="getLine(point3bis, false)[0][1]"
                :x2="getLine(point3bis, false)[1][0]"
                :y2="getLine(point3bis, false)[1][1]"
            />

            <line
                class="fold valley-fold"
                clip-path="url(#page)"
                :x1="getLine(point4, true)[0][0]"
                :y1="getLine(point4, true)[0][1]"
                :x2="getLine(point4, true)[1][0]"
                :y2="getLine(point4, true)[1][1]"
            />
            <line
                class="fold valley-fold"
                clip-path="url(#page)"
                :x1="getLine(point5, true)[0][0]"
                :y1="getLine(point5, true)[0][1]"
                :x2="getLine(point5, true)[1][0]"
                :y2="getLine(point5, true)[1][1]"
            />
            <line
                class="fold mountain-fold"
                clip-path="url(#page)"
                :x1="getLine(point6, true)[0][0]"
                :y1="getLine(point6, true)[0][1]"
                :x2="getLine(point6, true)[1][0]"
                :y2="getLine(point6, true)[1][1]"
            />
            <line
                class="fold valley-fold"
                clip-path="url(#page)"
                :x1="getLine(point4bis, true)[0][0]"
                :y1="getLine(point4bis, true)[0][1]"
                :x2="getLine(point4bis, true)[1][0]"
                :y2="getLine(point4bis, true)[1][1]"
            />
            <line
                class="fold valley-fold"
                clip-path="url(#page)"
                :x1="getLine(point5bis, true)[0][0]"
                :y1="getLine(point5bis, true)[0][1]"
                :x2="getLine(point5bis, true)[1][0]"
                :y2="getLine(point5bis, true)[1][1]"
            />
            <line
                class="fold mountain-fold"
                clip-path="url(#page)"
                :x1="getLine(point6bis, true)[0][0]"
                :y1="getLine(point6bis, true)[0][1]"
                :x2="getLine(point6bis, true)[1][0]"
                :y2="getLine(point6bis, true)[1][1]"
            />

            <line
                class="fold mountain-fold"
                :x1="intersection(point1, point4)[0]"
                :y1="intersection(point1, point4)[1]"
                :x2="intersection(point2, point5)[0]"
                :y2="intersection(point2, point5)[1]"
            />
            <line
                class="fold mountain-fold"
                :x1="intersection(point1bis, point4bis)[0]"
                :y1="intersection(point1bis, point4bis)[1]"
                :x2="intersection(point2bis, point5bis)[0]"
                :y2="intersection(point2bis, point5bis)[1]"
            />
            <line
                class="fold mountain-fold"
                :x1="intersection(point1, point4bis)[0]"
                :y1="intersection(point1, point4bis)[1]"
                :x2="intersection(point2, point5bis)[0]"
                :y2="intersection(point2, point5bis)[1]"
            />
            <line
                class="fold mountain-fold"
                :x1="intersection(point1bis, point4)[0]"
                :y1="intersection(point1bis, point4)[1]"
                :x2="intersection(point2bis, point5)[0]"
                :y2="intersection(point2bis, point5)[1]"
            />
        </g>
        <g>
            <!-- diagonal up-left -->
            <circle
                class="point"
                :cx="point1"
                :cy="point1"
                :r="5"
            />
            <circle
                class="point"
                :cx="point2"
                :cy="point2"
                :r="5"
            />
            <circle
                class="point"
                :cx="point3"
                :cy="point3"
                :r="5"
            />

            <!-- diagonal down-right -->
            <circle
                class="point"
                :cx="point1bis"
                :cy="point1bis"
                :r="5"
            />
            <circle
                class="point"
                :cx="point2bis"
                :cy="point2bis"
                :r="5"
            />
            <circle
                class="point"
                :cx="point3bis"
                :cy="point3bis"
                :r="5"
            />

            <!-- diagonal down-left -->
            <circle
                class="point"
                :cx="point4"
                :cy="point4bis"
                :r="5"
            />
            <circle
                class="point"
                :cx="point5"
                :cy="point5bis"
                :r="5"
            />
            <circle
                class="point"
                :cx="point6"
                :cy="point6bis"
                :r="5"
            />

            <!-- diagonal up-right -->
            <circle
                class="point"
                :cx="point4bis"
                :cy="point4"
                :r="5"
            />
            <circle
                class="point"
                :cx="point5bis"
                :cy="point5"
                :r="5"
            />
            <circle
                class="point"
                :cx="point6bis"
                :cy="point6"
                :r="5"
            />
        </g>
        <g>
            <Arrow
                :x="point1"
                :y="point1"
                :x2="500"
                :y2="500"
                :text="properties.width / 2"
            />
            <Arrow
                :x="point2"
                :y="point2"
                :x2="point1"
                :y2="point1"
                :text="properties.height"
            />
            <Arrow
                :x="point3"
                :y="point3"
                :x2="point2"
                :y2="point2"
                :text="properties.height"
            />
        </g>
        <g>
            <Arrow
                :x="point4"
                :y="point4bis"
                :x2="500"
                :y2="500"
                :text="properties.depth / 2"
            />
            <Arrow
                :x="point5"
                :y="point5bis"
                :x2="point4"
                :y2="point4bis"
                :text="properties.height"
            />
            <Arrow
                :x="point6"
                :y="point6bis"
                :x2="point5"
                :y2="point5bis"
                :text="properties.height"
            />
        </g>
        <AdditionalArrows />
    </svg>
</template>

<style scoped>
</style>
