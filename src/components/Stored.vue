<script setup lang="ts">
import { computed, defineEmits, reactive, ref, watch } from 'vue';
import IconSave from './icons/IconSave.vue';
import { getIcon } from '../origami';

let uid = 0;
let saveName = ref('');

const props = defineProps<{
    list: OrigamiSaved[];
    selected: OrigamiItem;
    properties: PropertyValues;
}>();

const emit = defineEmits<{
    change: [OrigamiSaved[]];
    load: [OrigamiSaved];
}>();

const save = () => {
    const item: OrigamiSaved = {
        id: ++uid,
        name: saveName.value || `saved-${uid}`,
        type: props.selected.id,
        values: { ...props.properties },
    };
    const list = [ ...props.list, item ];

    saveName.value = '';

    emit('change', list);
}

const load = (item: OrigamiSaved) => {
    emit('load', item);
};

</script>

<template>
    <form
        class="storage"
        @submit.prevent="save"
    >
        <label>
            <ul class="stored-list">
                <li v-for="item of props.list"
                    :key="item.id"
                    :title="item.name"
                >
                    <component :is="getIcon(item.type)"
                        class="btn-icon stored-item"
                        :dimensions="item.values"
                        @click.stop="load(item)"
                    />
                </li>
                <li
                    title="save"
                >
                    <IconSave
                        class="btn-icon active stored-item"
                        @click.stop="save"
                    />
                </li>
            </ul>
            <input
                placeholder="saved name"
                v-model="saveName"
                class="save-name"
            />
        </label>
    </form>
</template>

<style scoped>
.storage {
    width: 100%;
}

.stored-list {
    list-style-type: none;
    display: flex;
    flex-direction: row;
    gap: 15px;
}

.stored-item {
    width: 50px;
    height: 50px;
}

.save-name {
    width: 100%;
    visibility: hidden;
}
.storage:hover .save-name,
.save-name:focus {
    visibility: visible;
}
</style>
