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
                :x1="(properties.width) * page.ratio"
                :x2="(properties.width) * page.ratio"
                :y1="0"
                :y2="page.pHeight"
            />
            <line
                class="fold"
                :x1="(properties.width + properties.depth) * page.ratio"
                :x2="(properties.width + properties.depth) * page.ratio"
                :y1="0"
                :y2="page.pHeight"
            />
            <line
                class="fold"
                :x1="(2 * properties.width + properties.depth) * page.ratio"
                :x2="(2 * properties.width + properties.depth) * page.ratio"
                :y1="0"
                :y2="page.pHeight"
            />
            <line
                class="fold"
                :x1="(2 * properties.width + 2 * properties.depth) * page.ratio"
                :x2="(2 * properties.width + 2 * properties.depth) * page.ratio"
                :y1="0"
                :y2="page.pHeight"
            />

            <line
                class="fold"
                :x1="0"
                :x2="page.pWidth"
                :y1="(properties.marginA) * page.ratio"
                :y2="(properties.marginA) * page.ratio"
            />
            <line
                class="fold"
                :x1="0"
                :x2="page.pWidth"
                :y1="page.pHeight - (properties.marginA) * page.ratio"
                :y2="page.pHeight - (properties.marginA) * page.ratio"
            />
        </g>
        <g>
            <Arrow
                :x="0"
                :x2="(properties.width) * page.ratio"
                :y="page.pHeight"
                :y2="page.pHeight"
                :text="properties.width"
                reverseOffset
            />
            <Arrow
                :x="(properties.width) * page.ratio"
                :x2="(properties.width + properties.depth) * page.ratio"
                :y="page.pHeight"
                :y2="page.pHeight"
                :text="properties.depth"
                reverseOffset
            />
            <Arrow
                :x="(properties.width + properties.depth) * page.ratio"
                :x2="(2 * properties.width + properties.depth) * page.ratio"
                :y="page.pHeight"
                :y2="page.pHeight"
                :text="properties.width"
                reverseOffset
            />
            <Arrow
                :x="(2 * properties.width + properties.depth) * page.ratio"
                :x2="(2 * properties.width + 2 * properties.depth) * page.ratio"
                :y="page.pHeight"
                :y2="page.pHeight"
                :text="properties.depth"
                reverseOffset
            />
            <Arrow
                :x="(2 * properties.width + 2 * properties.depth) * page.ratio"
                :x2="page.pWidth"
                :y="page.pHeight"
                :y2="page.pHeight"
                :text="properties.marginB"
                reverseOffset
            />

            <Arrow
                :x="page.pWidth"
                :x2="page.pWidth"
                :y="0"
                :y2="(properties.marginA) * page.ratio"
                :text="properties.marginA"
            />
            <Arrow
                :x="page.pWidth"
                :x2="page.pWidth"
                :y="(properties.marginA) * page.ratio"
                :y2="(properties.marginA + properties.height) * page.ratio"
                :text="properties.height"
            />
            <Arrow
                :x="page.pWidth"
                :x2="page.pWidth"
                :y="(properties.marginA + properties.height) * page.ratio"
                :y2="page.pHeight"
                :text="properties.marginA"
            />
        </g>
    </svg>
</template>

<style scoped>
</style>
