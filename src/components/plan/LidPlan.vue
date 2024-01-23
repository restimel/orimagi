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

/* ---- */

const ready = computed(() => {
    const dimensions = props.dimensions;
    return [
        dimensions.lip,
        dimensions.height,
        dimensions.width,
        dimensions.depth,
        pWidth.value,
        pHeight.value,
    ].every((val) => Number.isFinite(val));
});

const lidRatio = computed(() => {
    return Math.max(Math.min(props.dimensions.ratio || 0, 100), 0);
});

const lipLid = computed(() => {
    const dimensions = props.dimensions;
    const depth = dimensions.depth;
    const ratio = lidRatio.value / 100;

    return depth * ratio + (dimensions.marginA || 0);
});

const dimLip = computed(() => {
    return props.dimensions.dim0;
});

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
        <g  v-if="props.dimensions.lip">
            <rect
                class="cut"
                :x="0"
                :y="0"
                :width="props.dimensions.lip * ratio"
                :height="(lipLid + props.dimensions.height) * ratio"
            />
            <rect
                class="cut"
                :x="pWidth - props.dimensions.lip * ratio"
                :y="0"
                :width="props.dimensions.lip * ratio"
                :height="(lipLid + props.dimensions.height) * ratio"
            />
            <rect
                class="cut"
                :x="0"
                :y="(lipLid + props.dimensions.height + props.dimensions.depth) * ratio"
                :width="props.dimensions.lip * ratio"
                :height="pHeight - (lipLid + props.dimensions.height + props.dimensions.depth) * ratio"
            />
            <rect
                class="cut"
                :x="pWidth - props.dimensions.lip * ratio"
                :y="(lipLid + props.dimensions.height + props.dimensions.depth) * ratio"
                :width="props.dimensions.lip * ratio"
                :height="pHeight - (lipLid + props.dimensions.height + props.dimensions.depth) * ratio"
            />
        </g>
        <g>
            <line
                class="fold"
                :x1="dimLip * ratio"
                :x2="dimLip * ratio"
                :y1="0"
                :y2="pHeight"
            />
            <line
                class="fold"
                :x1="(dimLip + props.dimensions.height) * ratio"
                :x2="(dimLip + props.dimensions.height) * ratio"
                :y1="0"
                :y2="pHeight"
            />
            <line
                class="fold"
                :x1="pWidth - (dimLip) * ratio"
                :x2="pWidth - (dimLip) * ratio"
                :y1="0"
                :y2="pHeight"
            />
            <line
                class="fold"
                :x1="pWidth - (dimLip + props.dimensions.height) * ratio"
                :x2="pWidth - (dimLip + props.dimensions.height) * ratio"
                :y1="0"
                :y2="pHeight"
            />

            <line
                class="fold"
                :x1="0"
                :x2="pWidth"
                :y2="lipLid * ratio"
                :y1="lipLid * ratio"
            />
            <line
                class="fold"
                :x1="0"
                :x2="pWidth"
                :y1="(lipLid + props.dimensions.height) * ratio"
                :y2="(lipLid + props.dimensions.height) * ratio"
            />
            <line
                class="fold"
                :x1="0"
                :x2="pWidth"
                :y1="(lipLid + props.dimensions.height + props.dimensions.depth) * ratio"
                :y2="(lipLid + props.dimensions.height + props.dimensions.depth) * ratio"
            />
            <line
                class="fold"
                :x1="0"
                :x2="pWidth"
                :y1="(lipLid + 2 * props.dimensions.height + props.dimensions.depth) * ratio"
                :y2="(lipLid + 2 * props.dimensions.height + props.dimensions.depth) * ratio"
            />
        </g>
        <g>
            <Arrow
                :x="pWidth"
                :y="0"
                :x2="pWidth"
                :y2="lipLid * ratio"
                :text="lipLid"
            />
            <Arrow
                :x="pWidth"
                :y="lipLid * ratio"
                :x2="pWidth"
                :y2="(lipLid + props.dimensions.height) * ratio"
                :text="props.dimensions.height"
            />
            <Arrow
                :x="pWidth"
                :y="(lipLid + props.dimensions.height) * ratio"
                :x2="pWidth"
                :y2="(lipLid + props.dimensions.height + props.dimensions.depth) * ratio"
                :text="props.dimensions.depth"
            />
            <Arrow
                :x="pWidth"
                :y="(lipLid + props.dimensions.height + props.dimensions.depth) * ratio"
                :x2="pWidth"
                :y2="(lipLid + 2 * props.dimensions.height + props.dimensions.depth) * ratio"
                :text="props.dimensions.height"
            />
            <Arrow
                :x="pWidth"
                :y="(lipLid + 2 * props.dimensions.height + props.dimensions.depth) * ratio"
                :x2="pWidth"
                :y2="pHeight"
                :text="props.dimensions.depth - lipLid + (props.dimensions.marginA || 0)"
            />

            <Arrow v-if="dimLip"
                :x="0"
                :y="pHeight"
                :x2="dimLip * ratio"
                :y2="pHeight"
                :text="dimLip"
                reverseOffset
            />
            <Arrow
                :x="dimLip * ratio"
                :y="pHeight"
                :x2="(dimLip + props.dimensions.height) * ratio"
                :y2="pHeight"
                :text="props.dimensions.height"
                reverseOffset
            />
            <Arrow
                :x="(dimLip + props.dimensions.height) * ratio"
                :y="pHeight"
                :x2="pWidth - (dimLip + props.dimensions.height) * ratio"
                :y2="pHeight"
                :text="props.dimensions.width"
                reverseOffset
            />
            <Arrow
                :x="pWidth - (dimLip + props.dimensions.height) * ratio"
                :y="pHeight"
                :x2="pWidth - (dimLip) * ratio"
                :y2="pHeight"
                :text="props.dimensions.height"
                reverseOffset
            />
            <Arrow v-if="dimLip"
                :x="pWidth - (dimLip) * ratio"
                :y="pHeight"
                :x2="pWidth"
                :y2="pHeight"
                :text="dimLip"
                reverseOffset
            />
        </g>
    </svg>
</template>

<style scoped>
</style>
