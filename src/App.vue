<script setup lang="ts">
import { ref } from 'vue';

import Language from './components/Language.vue';
import Menu from './components/Menu.vue';
import Form from './components/Form.vue';
import Plan from './components/Plan.vue';
import Stored from './components/Stored.vue';

import origamis, { getOrigami } from './origami';
import Preview from './components/Preview.vue';

const currentSelection = ref(origamis[0]);
const result = ref<AllValues>({
    width: 1,
    height: 1,
    depth: 1,
});

const saved = ref<OrigamiSaved[]>([]);

const select = (itemName: string) => {
    const origami = origamis.find((origami) => origami.id === itemName);

    if (!origami) {
        return;
    }

    currentSelection.value = origami;
};

const load = (item: OrigamiSaved) => {
    currentSelection.value = getOrigami(item.type)!;
    result.value = item.values;
};

const save = (list: OrigamiSaved[]) => {
    saved.value = list;
    localStorage.setItem('save', JSON.stringify(list));
};
const restore = () => {
    const strList = localStorage.getItem('save');

    if (!strList) {
        return;
    }

    const list = JSON.parse(strList);
    saved.value = list;
}

restore();

</script>

<template>
    <header>
        <Language class="language" />
        <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="65" height="65" />

        <div class="wrapper">
            <Form
                :origami="currentSelection"
                :values="result"
                @change="(value) => result = value"
            />
            <Preview
                :dimensions="result"
                :selected="currentSelection.id"
            />
            <Stored
                :list="saved"
                :selected="currentSelection"
                :properties="result"

                @change="save"
                @load="load"
            />
        </div>
    </header>

    <aside>
        <Menu
            :items="origamis"
            :selected="currentSelection.id"
            @change="select"
        />
    </aside>
    <section>
        <Plan
            :selected="currentSelection.id"
            :dimensions="result"
        />
    </section>
</template>

<style scoped>
header {
    line-height: 1.5;
}

.logo {
    display: block;
    margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
    header {
        display: flex;
        flex-direction: column;
        place-items: center;
        padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
        margin: 0 2rem 0 0;
    }

    header .wrapper {
        display: flex;
        place-items: flex-start;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: space-between;
        height: 100%;
        gap: 15px;
    }
}

.language {
    position: absolute;
    top: 10px;
    right: 10px;
}
</style>
