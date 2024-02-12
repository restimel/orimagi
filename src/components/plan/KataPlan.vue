<script setup lang="ts">
import { computed, defineEmits } from 'vue';
import Arrow from './common/Arrow.vue';

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
        dimensions.marginA,
        dimensions.marginB,
        page.pWidth,
        page.pHeight,
    ].every((val) => Number.isFinite(val));
});

emit('labels', {
    arrow: true,
    fold: true,
    cutLine: true,
});

</script>
<template>
    <svg
        v-if="ready"
        class="origami"
        xmlns="http://www.w3.org/2000/svg"

        viewBox="-100 -100 1200 1200"
    >
        <g class="paper">
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
        <g>
            <line
                class="fold"
                :x1="(properties.depth) * page.ratio"
                :x2="(properties.depth) * page.ratio"
                :y1="0"
                :y2="page.pHeight"
            />
            <line
                class="fold"
                :x1="(properties.depth + properties.height) * page.ratio"
                :x2="(properties.depth + properties.height) * page.ratio"
                :y1="0"
                :y2="page.pHeight"
            />
            <line
                class="fold"
                :x1="(properties.depth + 2 * properties.height) * page.ratio"
                :x2="(properties.depth + 2 * properties.height) * page.ratio"
                :y1="0"
                :y2="page.pHeight"
            />
        </g>
        <g v-if="properties.marginB > 0">
            <line
                class="fold"
                :x1="(properties.depth + 2 * properties.height + properties.marginA) * page.ratio"
                :x2="(properties.depth + 2 * properties.height + properties.marginA) * page.ratio"
                :y1="0"
                :y2="page.pHeight"
            />
            <line
                class="fold"
                :x1="(properties.depth + 3 * properties.height + properties.marginA) * page.ratio"
                :x2="(properties.depth + 3 * properties.height + properties.marginA) * page.ratio"
                :y1="0"
                :y2="page.pHeight"
            />
            <line
                class="fold"
                :x1="(properties.depth + 4 * properties.height + properties.marginA) * page.ratio"
                :x2="(properties.depth + 4 * properties.height + properties.marginA) * page.ratio"
                :y1="0"
                :y2="page.pHeight"
            />
        </g>
        <g>
            <line
                class="fold"
                :x1="0"
                :x2="properties.depth * page.ratio"
                :y1="properties.height * page.ratio"
                :y2="properties.height * page.ratio"
            />
            <line
                class="cut-line"
                :x1="properties.depth * page.ratio"
                :x2="(properties.depth + 2 * properties.height) * page.ratio"
                :y1="properties.height * page.ratio"
                :y2="properties.height * page.ratio"
            />
            <line
                class="fold"
                :x1="(properties.depth + 2 * properties.height) * page.ratio"
                :x2="(properties.depth + 2 * properties.height + properties.marginA) * page.ratio"
                :y1="properties.height * page.ratio"
                :y2="properties.height * page.ratio"
            />
            <line v-if="properties.marginB > 0"
                class="cut-line"
                :x1="(properties.depth + 2 * properties.height + properties.marginA) * page.ratio"
                :x2="(properties.depth + 4 * properties.height + properties.marginA) * page.ratio"
                :y1="properties.height * page.ratio"
                :y2="properties.height * page.ratio"
            />
            <line v-if="properties.marginB > 0"
                class="fold"
                :x1="(properties.depth + 4 * properties.height + properties.marginA) * page.ratio"
                :x2="page.pWidth"
                :y1="properties.height * page.ratio"
                :y2="properties.height * page.ratio"
            />


            <line
                class="fold"
                :x1="0"
                :x2="properties.depth * page.ratio"
                :y1="(properties.height + properties.width) * page.ratio"
                :y2="(properties.height + properties.width) * page.ratio"
            />
            <line
                class="cut-line"
                :x1="properties.depth * page.ratio"
                :x2="(properties.depth + 2 * properties.height) * page.ratio"
                :y1="(properties.height + properties.width) * page.ratio"
                :y2="(properties.height + properties.width) * page.ratio"
            />
            <line
                class="fold"
                :x1="(properties.depth + 2 * properties.height) * page.ratio"
                :x2="(properties.depth + 2 * properties.height + properties.marginA) * page.ratio"
                :y1="(properties.height + properties.width) * page.ratio"
                :y2="(properties.height + properties.width) * page.ratio"
            />
            <line v-if="properties.marginB > 0"
                class="cut-line"
                :x1="(properties.depth + 2 * properties.height + properties.marginA) * page.ratio"
                :x2="(properties.depth + 4 * properties.height + properties.marginA) * page.ratio"
                :y1="(properties.height + properties.width) * page.ratio"
                :y2="(properties.height + properties.width) * page.ratio"
            />
            <line v-if="properties.marginB > 0"
                class="fold"
                :x1="(properties.depth + 4 * properties.height + properties.marginA) * page.ratio"
                :x2="page.pWidth"
                :y1="(properties.height + properties.width) * page.ratio"
                :y2="(properties.height + properties.width) * page.ratio"
            />
        </g>
        <g>
            <Arrow
                :x="0"
                :x2="(properties.depth) * page.ratio"
                :y="page.pHeight"
                :y2="page.pHeight"
                :text="properties.depth"
                reverseOffset
            />
            <Arrow
                :x="(properties.depth) * page.ratio"
                :x2="(properties.depth + properties.height) * page.ratio"
                :y="page.pHeight"
                :y2="page.pHeight"
                :text="properties.height"
                reverseOffset
            />
            <Arrow
                :x="(properties.depth + properties.height) * page.ratio"
                :x2="(properties.depth + 2 * properties.height) * page.ratio"
                :y="page.pHeight"
                :y2="page.pHeight"
                :text="properties.height"
                reverseOffset
            />
            <Arrow
                :x="(properties.depth + 2 * properties.height) * page.ratio"
                :x2="(properties.depth + 2 * properties.height + properties.marginA) * page.ratio"
                :y="page.pHeight"
                :y2="page.pHeight"
                :text="properties.marginA"
                reverseOffset
            />
        </g>
        <g v-if="properties.marginB > 0">
            <Arrow
                :x="(properties.depth + 2 * properties.height + properties.marginA) * page.ratio"
                :x2="(properties.depth + 3 * properties.height + properties.marginA) * page.ratio"
                :y="page.pHeight"
                :y2="page.pHeight"
                :text="properties.height"
                reverseOffset
            />
            <Arrow
                :x="(properties.depth + 3 * properties.height + properties.marginA) * page.ratio"
                :x2="(properties.depth + 4 * properties.height + properties.marginA) * page.ratio"
                :y="page.pHeight"
                :y2="page.pHeight"
                :text="properties.height"
                reverseOffset
            />
            <Arrow
                :x="(properties.depth + 4 * properties.height + properties.marginA) * page.ratio"
                :x2="page.pWidth"
                :y="page.pHeight"
                :y2="page.pHeight"
                :text="properties.marginB"
                reverseOffset
            />
        </g>
    </svg>
</template>

<style scoped>
</style>
