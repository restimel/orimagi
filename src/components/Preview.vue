<script setup lang="ts">
import { computed } from 'vue';
import { getIcon } from '@/origami';

const props = defineProps<{
    selected: string;
    dimensions: AllValues;
}>();

const origamiIcon = computed(() => {
    return getIcon(props.selected);
});

</script>
<template>
    <div class="preview">
        <Component
            :is="origamiIcon"
            :dimensions="props.dimensions"
            class="show-model"
        />
    </div>
</template>

<style scoped>
.preview {
    height: 100%;
    align-self: center;
    min-height: 100px;
}
.show-model {
    width: 100%;
    height: 100%;
}
</style>
