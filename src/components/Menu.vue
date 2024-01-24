<script setup lang="ts">
defineProps<{
    items: OrigamiItem[];
    selected: string;
}>();
</script>
<template>
    <div class="menu">
        <div class="vertical-line"></div>
        <ul class="menu-list">
            <li v-for="item of items"
                :class="{
                    'menu-item': true,
                    selected: item.id === selected,
                }"
                :key="item.id"
                :title="item.name"
                @click="() => $emit('change', item.id)"
            >
                <component :is="item.icon" />
            </li>
        </ul>
    </div>
</template>

<style scoped>
.vertical-line {
    display: block;
    position: absolute;
    background-color: var(--color-border);
    width: 1px;
    height: 100%;
}

.menu {
    position: relative;
    height: 100%;
}

.menu-list {
    display: flex;
    flex-direction: row;
    list-style: none;
    position: absolute;
    left: -65px;

    align-content: space-between;
    height: 100%;
    flex-wrap: wrap;
}

.menu-item {
    display: flex;
    place-items: center;
    place-content: center;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    width: 50px;
    height: 50px;
    background: var(--color-background-soft);
    cursor: pointer;
}
.menu-item.selected {
    background: var(--color-brand-primary);
}
.menu-item:hover {
    stroke: var(--color-brand-primary);
}
</style>
