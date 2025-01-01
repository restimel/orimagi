<script setup lang="ts">
</script>
<template>
    <pattern id="pasteFrontArea" patternUnits="userSpaceOnUse" width="10" height="10">
        <circle cx="5" cy="5" r="1" />
    </pattern>

    <pattern id="pasteBackArea" patternUnits="userSpaceOnUse" width="10" height="10">
        <line x1="5" y1="3" x2="5" y2="7" />
        <line x1="1" y1="5" x2="9" y2="5" />
    </pattern>
</template>

<style scoped>

#pasteBackArea {
    fill: none;
    stroke: rgba(150, 150, 150, 1);
    stroke-width: 1;
}

#pasteFrontArea {
    stroke: none;
    fill: rgba(150, 150, 150, 1);
}

</style>
