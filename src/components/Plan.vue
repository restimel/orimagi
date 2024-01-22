<script setup lang="ts">
import { computed } from 'vue';
import MasuPlan from './plan/MasuPlan.vue';

const props = defineProps<{
    selected: string;
    dimensions: AllValues;
}>();

const component = computed(() => {
    switch (props.selected) {
        case 'Masu':
        default:
            return MasuPlan;
    }
});

</script>
<template>
    <div class="plan">
        <Component :is="component" :dimensions="props.dimensions" />
    </div>
</template>

<style scoped>
.plan {
    padding: 25px;
}
</style>
