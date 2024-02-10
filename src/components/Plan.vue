<script setup lang="ts">
import { computed } from 'vue';
import CardHolderPlan from './plan/CardHolderPlan.vue';
import CardsHolderPlan from './plan/CardsHolderPlan.vue';
import LidPlan from './plan/LidPlan.vue';
import KataDivider from './plan/KataPlan.vue';
import MasuPlan from './plan/MasuPlan.vue';

const props = defineProps<{
    selected: string;
    dimensions: AllValues;
}>();

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
    <div class="plan">
        <Component
            :is="component"
            :dimensions="props.dimensions"
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
