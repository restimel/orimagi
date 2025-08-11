<script setup lang="ts">
import { computed, defineEmits } from 'vue';
import Arrow from './common/Arrow.vue';
import CutArea from './common/CutArea.vue';
import PasteArea from './common/PasteArea.vue';
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
        dimensions.lip,
        dimensions.height,
        dimensions.width,
        dimensions.depth,
        page.pWidth,
        page.pHeight,
    ].every((val) => Number.isFinite(val));
});

const height = computed(() => {
    return properties.height;
});

const width = computed(() => {
    return properties.depth;
});

const depth = computed(() => {
    return properties.width;
});

const lidOver = computed(() => {
    const widthValue = width.value;
    const ratio = properties.ratio / 100;

    return widthValue * ratio;
});

const topLid = computed(() => {
    const margin = Math.min(lidOver.value, properties.marginA);

    return width.value - lidOver.value + margin;
});

const bottomLid = computed(() => {
    return lidOver.value;
});

emit('labels', {
    arrow: true,
    fold: true,
    foldDetails: true,
    cut: true,
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
            <CutArea />
            <PasteArea />
        </defs>
        <g  v-if="properties.lip">
            <rect
                class="cut"
                :x="0"
                :y="0"
                :width="properties.lip * page.ratio"
                :height="(topLid + height) * page.ratio"
            />
            <rect
                class="cut"
                :x="page.pWidth - properties.lip * page.ratio"
                :y="0"
                :width="properties.lip * page.ratio"
                :height="(topLid + height) * page.ratio"
            />
            <rect
                class="cut"
                :x="0"
                :y="page.pHeight - (bottomLid + height) * page.ratio"
                :width="properties.lip * page.ratio"
                :height="(bottomLid + height) * page.ratio"
            />
            <rect
                class="cut"
                :x="page.pWidth - properties.lip * page.ratio"
                :y="page.pHeight - (bottomLid + height) * page.ratio"
                :width="properties.lip * page.ratio"
                :height="(bottomLid + height) * page.ratio"
            />
        </g>
        <g>
            <rect
                class="paste-front"
                :x="properties.lip * page.ratio"
                :y="0"
                :width="2 * height * page.ratio"
                :height="topLid * page.ratio"
            />
            <rect
                class="paste-front"
                :x="page.pWidth - (2 * height + properties.lip) * page.ratio"
                :y="0"
                :width="2 * height * page.ratio"
                :height="topLid * page.ratio"
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
                class="fold valley-fold"
                :x1="properties.lip * page.ratio"
                :x2="properties.lip * page.ratio"
                :y1="0"
                :y2="page.pHeight"
            />
            <line
                class="fold valley-fold"
                :x1="(properties.lip + height) * page.ratio"
                :x2="(properties.lip + height) * page.ratio"
                :y1="0"
                :y2="page.pHeight"
            />
            <line
                class="fold valley-fold"
                :x1="page.pWidth - (properties.lip) * page.ratio"
                :x2="page.pWidth - (properties.lip) * page.ratio"
                :y1="0"
                :y2="page.pHeight"
            />
            <line
                class="fold valley-fold"
                :x1="page.pWidth - (properties.lip + height) * page.ratio"
                :x2="page.pWidth - (properties.lip + height) * page.ratio"
                :y1="0"
                :y2="page.pHeight"
            />

            <line
                class="fold valley-fold"
                :x1="0"
                :x2="page.pWidth"
                :y2="topLid * page.ratio"
                :y1="topLid * page.ratio"
            />
            <line
                class="fold valley-fold"
                :x1="0"
                :x2="page.pWidth"
                :y1="(topLid + height) * page.ratio"
                :y2="(topLid + height) * page.ratio"
            />
            <line
                class="fold valley-fold"
                :x1="0"
                :x2="page.pWidth"
                :y1="(topLid + height + width) * page.ratio"
                :y2="(topLid + height + width) * page.ratio"
            />
            <line
                class="fold valley-fold"
                :x1="0"
                :x2="page.pWidth"
                :y1="(topLid + 2 * height + width) * page.ratio"
                :y2="(topLid + 2 * height + width) * page.ratio"
            />

            <line
                class="fold mountain-fold"
                :x1="(properties.lip) * page.ratio"
                :x2="(properties.lip + height) * page.ratio"
                :y1="(topLid) * page.ratio"
                :y2="(topLid + height) * page.ratio"
            />
            <line
                class="fold mountain-fold"
                :x1="page.pWidth - (properties.lip) * page.ratio"
                :x2="page.pWidth - (properties.lip + height) * page.ratio"
                :y1="(topLid) * page.ratio"
                :y2="(topLid + height) * page.ratio"
            />
            <line
                class="fold mountain-fold"
                :x1="(properties.lip) * page.ratio"
                :x2="(properties.lip + height) * page.ratio"
                :y1="page.pHeight - (bottomLid) * page.ratio"
                :y2="page.pHeight - (bottomLid + height) * page.ratio"
            />
            <line
                class="fold mountain-fold"
                :x1="page.pWidth - (properties.lip) * page.ratio"
                :x2="page.pWidth - (properties.lip + height) * page.ratio"
                :y1="page.pHeight - (bottomLid) * page.ratio"
                :y2="page.pHeight - (bottomLid + height) * page.ratio"
            />
        </g>
        <g>
            <Arrow
                :x="page.pWidth"
                :y="0"
                :x2="page.pWidth"
                :y2="topLid * page.ratio"
                :text="topLid"
            />
            <Arrow
                :x="page.pWidth"
                :y="topLid * page.ratio"
                :x2="page.pWidth"
                :y2="(topLid + height) * page.ratio"
                :text="height"
            />
            <Arrow
                :x="page.pWidth"
                :y="(topLid + height) * page.ratio"
                :x2="page.pWidth"
                :y2="(topLid + height + width) * page.ratio"
                :text="width"
            />
            <Arrow
                :x="page.pWidth"
                :y="(topLid + height + width) * page.ratio"
                :x2="page.pWidth"
                :y2="(topLid + 2 * height + width) * page.ratio"
                :text="height"
            />
            <Arrow
                :x="page.pWidth"
                :y="page.pHeight - (bottomLid) * page.ratio"
                :x2="page.pWidth"
                :y2="page.pHeight"
                :text="bottomLid"
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
                :x2="(properties.lip + height) * page.ratio"
                :y2="page.pHeight"
                :text="height"
                reverseOffset
            />
            <Arrow
                :x="(properties.lip + height) * page.ratio"
                :y="page.pHeight"
                :x2="page.pWidth - (properties.lip + height) * page.ratio"
                :y2="page.pHeight"
                :text="depth"
                reverseOffset
            />
            <Arrow
                :x="page.pWidth - (properties.lip + height) * page.ratio"
                :y="page.pHeight"
                :x2="page.pWidth - (properties.lip) * page.ratio"
                :y2="page.pHeight"
                :text="height"
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
        <AdditionalArrows />
    </svg>
</template>

<style scoped>
</style>
