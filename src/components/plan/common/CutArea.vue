<script setup lang="ts">
</script>
<template>
    <pattern id="cutArea" patternUnits="userSpaceOnUse" width="10" height="10">
        <line x1="0" y1="0" x2="10" y2="10" />
        <line x1="0" y1="10" x2="10" y2="0" />
    </pattern>
</template>

<style scoped>

#cutArea {
    fill: none;
    stroke: rgba(150, 150, 150, 1);
    stroke-width: 1;
}

</style>
