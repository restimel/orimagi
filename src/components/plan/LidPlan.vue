<script setup lang="ts">
import { computed } from 'vue';
import Arrow from './common/Arrow.vue';
import CutArea from './common/CutArea.vue';

import * as plan from './plan';

const props = defineProps<{
    dimensions: AllValues;
}>();

const page = plan.page(props);
const properties = plan.properties(props);

const ready = computed(() => {
    const dimensions = props.dimensions;
    return [
        dimensions.lip,
        dimensions.height,
        dimensions.width,
        dimensions.depth,
        page.pWidth,
        page.pHeight,
    ].every((val) => Number.isFinite(val));
});

const lidOver = computed(() => {
    const depth = properties.depth;
    const ratio = properties.ratio / 100;

    return depth * ratio;
});

const lipLid = computed(() => {
    if (lidOver.value < properties.marginA) {
        return lidOver.value + properties.marginA;
    }

    return lidOver.value;
});

const lidCover = computed(() => {
    const margin = lidOver.value < properties.marginA ? 0 : properties.marginA;

    return properties.depth - lidOver.value + margin;
});

</script>
<template>
    <svg
        v-if="ready"
        class="origami"
        xmlns="http://www.w3.org/2000/svg"

        viewBox="-100 -100 1200 1200"
    >
        <defs>
            <CutArea />
        </defs>
        <g  v-if="properties.lip">
            <rect
                class="cut"
                :x="0"
                :y="0"
                :width="properties.lip * page.ratio"
                :height="(lipLid + properties.height) * page.ratio"
            />
            <rect
                class="cut"
                :x="page.pWidth - properties.lip * page.ratio"
                :y="0"
                :width="properties.lip * page.ratio"
                :height="(lipLid + properties.height) * page.ratio"
            />
            <rect
                class="cut"
                :x="0"
                :y="page.pHeight - (lidCover + properties.height) * page.ratio"
                :width="properties.lip * page.ratio"
                :height="(lidCover + properties.height) * page.ratio"
            />
            <rect
                class="cut"
                :x="page.pWidth - properties.lip * page.ratio"
                :y="page.pHeight - (lidCover + properties.height) * page.ratio"
                :width="properties.lip * page.ratio"
                :height="(lidCover + properties.height) * page.ratio"
            />
        </g>
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
                :x1="properties.lip * page.ratio"
                :x2="properties.lip * page.ratio"
                :y1="0"
                :y2="page.pHeight"
            />
            <line
                class="fold"
                :x1="(properties.lip + properties.height) * page.ratio"
                :x2="(properties.lip + properties.height) * page.ratio"
                :y1="0"
                :y2="page.pHeight"
            />
            <line
                class="fold"
                :x1="page.pWidth - (properties.lip) * page.ratio"
                :x2="page.pWidth - (properties.lip) * page.ratio"
                :y1="0"
                :y2="page.pHeight"
            />
            <line
                class="fold"
                :x1="page.pWidth - (properties.lip + properties.height) * page.ratio"
                :x2="page.pWidth - (properties.lip + properties.height) * page.ratio"
                :y1="0"
                :y2="page.pHeight"
            />

            <line
                class="fold"
                :x1="0"
                :x2="page.pWidth"
                :y2="lipLid * page.ratio"
                :y1="lipLid * page.ratio"
            />
            <line
                class="fold"
                :x1="0"
                :x2="page.pWidth"
                :y1="(lipLid + properties.height) * page.ratio"
                :y2="(lipLid + properties.height) * page.ratio"
            />
            <line
                class="fold"
                :x1="0"
                :x2="page.pWidth"
                :y1="(lipLid + properties.height + properties.depth) * page.ratio"
                :y2="(lipLid + properties.height + properties.depth) * page.ratio"
            />
            <line
                class="fold"
                :x1="0"
                :x2="page.pWidth"
                :y1="(lipLid + 2 * properties.height + properties.depth) * page.ratio"
                :y2="(lipLid + 2 * properties.height + properties.depth) * page.ratio"
            />

            <line
                class="fold"
                :x1="(properties.lip) * page.ratio"
                :x2="(properties.lip + properties.height) * page.ratio"
                :y1="(lipLid) * page.ratio"
                :y2="(lipLid + properties.height) * page.ratio"
            />
            <line
                class="fold"
                :x1="page.pWidth - (properties.lip) * page.ratio"
                :x2="page.pWidth - (properties.lip + properties.height) * page.ratio"
                :y1="(lipLid) * page.ratio"
                :y2="(lipLid + properties.height) * page.ratio"
            />
            <line
                class="fold"
                :x1="(properties.lip) * page.ratio"
                :x2="(properties.lip + properties.height) * page.ratio"
                :y1="page.pHeight - (lidCover) * page.ratio"
                :y2="page.pHeight - (lidCover + properties.height) * page.ratio"
            />
            <line
                class="fold"
                :x1="page.pWidth - (properties.lip) * page.ratio"
                :x2="page.pWidth - (properties.lip + properties.height) * page.ratio"
                :y1="page.pHeight - (lidCover) * page.ratio"
                :y2="page.pHeight - (lidCover + properties.height) * page.ratio"
            />
        </g>
        <g>
            <Arrow
                :x="page.pWidth"
                :y="0"
                :x2="page.pWidth"
                :y2="lipLid * page.ratio"
                :text="lipLid"
            />
            <Arrow
                :x="page.pWidth"
                :y="lipLid * page.ratio"
                :x2="page.pWidth"
                :y2="(lipLid + properties.height) * page.ratio"
                :text="properties.height"
            />
            <Arrow
                :x="page.pWidth"
                :y="(lipLid + properties.height) * page.ratio"
                :x2="page.pWidth"
                :y2="(lipLid + properties.height + properties.depth) * page.ratio"
                :text="properties.depth"
            />
            <Arrow
                :x="page.pWidth"
                :y="(lipLid + properties.height + properties.depth) * page.ratio"
                :x2="page.pWidth"
                :y2="(lipLid + 2 * properties.height + properties.depth) * page.ratio"
                :text="properties.height"
            />
            <Arrow
                :x="page.pWidth"
                :y="page.pHeight - (lidCover) * page.ratio"
                :x2="page.pWidth"
                :y2="page.pHeight"
                :text="lidCover"
            />

            <Arrow v-if="properties.lip"
                :x="0"
                :y="page.pHeight"
                :x2="properties.lip * page.ratio"
                :y2="page.pHeight"
                :text="properties.lip"
                reverseOffset
            />
            <Arrow
                :x="properties.lip * page.ratio"
                :y="page.pHeight"
                :x2="(properties.lip + properties.height) * page.ratio"
                :y2="page.pHeight"
                :text="properties.height"
                reverseOffset
            />
            <Arrow
                :x="(properties.lip + properties.height) * page.ratio"
                :y="page.pHeight"
                :x2="page.pWidth - (properties.lip + properties.height) * page.ratio"
                :y2="page.pHeight"
                :text="properties.width"
                reverseOffset
            />
            <Arrow
                :x="page.pWidth - (properties.lip + properties.height) * page.ratio"
                :y="page.pHeight"
                :x2="page.pWidth - (properties.lip) * page.ratio"
                :y2="page.pHeight"
                :text="properties.height"
                reverseOffset
            />
            <Arrow v-if="properties.lip"
                :x="page.pWidth - (properties.lip) * page.ratio"
                :y="page.pHeight"
                :x2="page.pWidth"
                :y2="page.pHeight"
                :text="properties.lip"
                reverseOffset
            />
        </g>
    </svg>
</template>

<style scoped>
</style>
