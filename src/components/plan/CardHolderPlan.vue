<script setup lang="ts">
import { computed, defineEmits } from 'vue';
import Arrow from './common/Arrow.vue';
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
        dimensions.height,
        dimensions.width,
        page.pWidth,
        page.pHeight,
    ].every((val) => Number.isFinite(val));
});

emit('labels', {
    arrow: true,
    fold: true,
    foldDetails: true,
    cut: false,
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
            <PasteArea />
        </defs>
        <g>
            <rect
                class="paste-front"
                :x="0"
                :y="0"
                :width="(properties.width - properties.depth) * page.ratio"
                :height="page.pHeight"
            />
            <rect
                class="paste-front"
                :x="(2 * properties.width + properties.depth) * page.ratio"
                :y="properties.depth * page.ratio"
                :width="properties.width * page.ratio"
                :height="(properties.width - properties.depth) * page.ratio"
            />
            <rect
                class="paste-front"
                :x="(3 * properties.width + 2 * properties.depth) * page.ratio"
                :y="0"
                :width="properties.width * page.ratio"
                :height="page.pHeight"
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
                class="fold mountain-fold"
                :x1="(properties.width - properties.depth) * page.ratio"
                :x2="(properties.width - properties.depth) * page.ratio"
                :y1="0"
                :y2="page.pHeight"
            />
            <line
                class="fold mountain-fold"
                :x1="(properties.width) * page.ratio"
                :x2="(properties.width) * page.ratio"
                :y1="0"
                :y2="page.pHeight"
            />
            <line
                class="fold valley-fold"
                :x1="(2 * properties.width) * page.ratio"
                :x2="(2 * properties.width) * page.ratio"
                :y1="0"
                :y2="page.pHeight"
            />
            <line
                class="fold valley-fold"
                :x1="(2 * properties.width + properties.depth) * page.ratio"
                :x2="(2 * properties.width + properties.depth) * page.ratio"
                :y1="0"
                :y2="page.pHeight"
            />
            <line
                class="fold valley-fold"
                :x1="(3 * properties.width + properties.depth) * page.ratio"
                :x2="(3 * properties.width + properties.depth) * page.ratio"
                :y1="0"
                :y2="page.pHeight"
            />
            <line
                class="fold valley-fold"
                :x1="(3 * properties.width + 2 * properties.depth) * page.ratio"
                :x2="(3 * properties.width + 2 * properties.depth) * page.ratio"
                :y1="0"
                :y2="page.pHeight"
            />

            <line
                class="fold valley-fold"
                :x1="(2 * properties.width) * page.ratio"
                :x2="(properties.width) * page.ratio"
                :y1="0"
                :y2="page.pHeight"
            />
            <line
                class="fold valley-fold"
                :x1="page.pWidth - (properties.width) * page.ratio"
                :x2="page.pWidth"
                :y1="0"
                :y2="page.pHeight"
            />
        </g>
        <g>
            <Arrow
                :x="0"
                :x2="(properties.width - properties.depth) * page.ratio"
                :y="page.pHeight"
                :y2="page.pHeight"
                :text="properties.width - properties.depth"
                reverseOffset
            />
            <Arrow
                :x="(properties.width - properties.depth) * page.ratio"
                :x2="(properties.width) * page.ratio"
                :y="page.pHeight"
                :y2="page.pHeight"
                :text="properties.depth"
                reverseOffset
            />
            <Arrow
                :x="(properties.width) * page.ratio"
                :x2="(2 * properties.width) * page.ratio"
                :y="page.pHeight"
                :y2="page.pHeight"
                :text="properties.width"
                reverseOffset
            />
            <Arrow
                :x="(2 * properties.width) * page.ratio"
                :x2="(2 * properties.width + properties.depth) * page.ratio"
                :y="page.pHeight"
                :y2="page.pHeight"
                :text="properties.depth"
                reverseOffset
            />
            <Arrow
                :x="(2 * properties.width + properties.depth) * page.ratio"
                :x2="(3 * properties.width + properties.depth) * page.ratio"
                :y="page.pHeight"
                :y2="page.pHeight"
                :text="properties.width"
                reverseOffset
            />
            <Arrow
                :x="(3 * properties.width + properties.depth) * page.ratio"
                :x2="(3 * properties.width + 2 * properties.depth) * page.ratio"
                :y="page.pHeight"
                :y2="page.pHeight"
                :text="properties.depth"
                reverseOffset
            />
            <Arrow
                :x="page.pWidth - (properties.width) * page.ratio"
                :x2="page.pWidth"
                :y="page.pHeight"
                :y2="page.pHeight"
                :text="properties.width"
                reverseOffset
            />
        </g>
        <AdditionalArrows />
    </svg>
</template>

<style scoped>
</style>
