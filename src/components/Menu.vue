<script setup lang="ts">
import DocumentationIcon from './icons/IconDocumentation.vue'
</script>
<template>
    <div class="menu">
        <div class="vertical-line"></div>
        <DocumentationIcon />
    </div>
</template>

<style scoped>
.vertical-line {
    display: block;
    position: absolute;
    background-color: black;
    width: 1px;
    height: 100%;
}
</style>
