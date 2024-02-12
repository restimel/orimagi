<script setup lang="ts">
import { computed, ref } from 'vue';
import OrigamiSettings from './OrigamiSettings.vue';
import CardHolderPlan from './plan/CardHolderPlan.vue';
import CardsHolderPlan from './plan/CardsHolderPlan.vue';
import LidPlan from './plan/LidPlan.vue';
import KataDivider from './plan/KataPlan.vue';
import MasuPlan from './plan/MasuPlan.vue';

const props = defineProps<{
    selected: string;
    dimensions: AllValues;
}>();

const displayLabel = ref<Partial<SettingsDisplay>>({});
const details = ref<SettingsDisplay>({
    arrow: true,
    cut: true,
    cutLine: true,
    fold: true,
    mark: true,
    page: true,
    point: true,
});

const component = computed(() => {
    switch (props.selected) {
        case 'CardsHolder':
            return CardsHolderPlan;
        case 'Lid':
            return LidPlan;
        case 'KataDivider':
            return KataDivider;
        case 'VCardHolder':
            return CardHolderPlan;
        case 'Masu':
        default:
            return MasuPlan;
    }
});

</script>
<template>
    <div
        class="plan"
        :class="{
            noArrow: !details.arrow,
            noCut: !details.cut,
            noCutLine: !details.cutLine,
            noFold: !details.fold,
            noMark: !details.mark,
            noPoint: !details.point,
        }"
    >
        <Component
            :is="component"
            :dimensions="props.dimensions"
            @labels="(labels) => displayLabel = labels"
        />
        <OrigamiSettings
            :display="displayLabel"
            @change="(value) => details = value"
        />
    </div>
</template>

<style scoped>
.plan {
    padding: 25px;
    width: var(--plan-width, 90vw);
    max-height: 100vh;
    overflow: auto;
}
</style>
<style>
.plan.noArrow :is(.arrow, .arrow-label-value) {
    stroke: none;
    fill: none;
}
.plan.noCut .cut {
    stroke: none;
    fill: none;
}
.plan.noCutLine .cut-line {
    stroke-dasharray: none;
}
.plan.noCutLine.noFold .cut-line {
    stroke: none;
    fill: none;
}
.plan.noFold .fold {
    stroke: none;
    fill: none;
}
.plan.noMark .mark {
    stroke: none;
    fill: none;
}
.plan.noPoint .point {
    stroke: none;
    fill: none;
}
</style>
