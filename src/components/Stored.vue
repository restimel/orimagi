<script setup lang="ts">
import _ from '@/i18n';
import { defineEmits, ref } from 'vue';
import IconSave from './icons/IconSave.vue';
import IconClose from './icons/IconClose.vue';
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

const remove = (item: OrigamiSaved) => {
    const list = props.list;
    const index = list.indexOf(item);

    if (index === -1) {
        return;
    }

    const newList = list.toSpliced?.(index, 1) ?? list.slice(0, index).concat(list.slice(index + 1));

    emit('change', newList);
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
                    class="stored-item"
                >
                    <component :is="getIcon(item.type)"
                        class="btn-icon stored-item__main"
                        :dimensions="item.values"
                        @click.stop="load(item)"
                    />
                    <IconClose
                        class="btn-icon remove-save"
                        :title="_('remove this saved item')"
                        @click.stop="remove(item)"
                    />
                </li>
                <li
                    :title="_('save')"
                >
                    <IconSave
                        class="btn-icon active stored-item__main"
                        @click.stop="save"
                    />
                </li>
            </ul>
            <input
                :placeholder="_('saved name')"
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

.stored-item__main {
    width: 50px;
    height: 50px;
}

.remove-save {
    display: none;
    position: absolute;
    border-radius: 100%;
    top: -10px;
    right: -10px;
    font-size: 0.5em;
}
.remove-save:hover {
    background-color: var(--color-brand-primary);
}

.stored-item {
    position: relative;
}

.stored-item:hover .remove-save {
    display: block;
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
