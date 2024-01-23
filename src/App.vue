<script setup lang="ts">
import { ref } from 'vue';

import Menu from './components/Menu.vue';
import Form from './components/Form.vue';
import Plan from './components/Plan.vue';

import LidIcon from './components/icons/IconLid.vue';
import MasuIcon from './components/icons/IconMasu.vue';

const origamis: OrigamiItem[] = [{
    name: 'Masu',
    icon: MasuIcon,
    properties: {
        width: true,
        height: true,
        depth: true,
    },
    dimension: {
        'Paper width': (dim: Dimension) => {
            return (dim.width + dim.depth + 4 * dim.height) / Math.SQRT2;
        },
        'Paper height': (dim: Dimension) => {
            return (dim.width + dim.depth + 4 * dim.height) / Math.SQRT2;
        },
        'Volume': (dim: Dimension) => {
            return dim.width * dim.depth * dim.height;
        },
    },
}, {
    name: 'Lid',
    icon: LidIcon,
    properties: {
        width: true,
        height: true,
        depth: true,
        lip: true,
        marginA: 'lid oversize (to close correctly)',
        ratio: 'lid split (%)',
    },
    dimension: {
        'Paper width': (dim: Dimension) => {
            return dim.width + 2 * dim.height + 2 * dim.lip;
        },
        'Paper height': (dim: Dimension) => {
            return 2 * dim.depth + 2 * dim.height + 2 * dim.lip + dim.marginA;
        },
        'Volume': (dim: Dimension) => {
            return dim.width * dim.depth * dim.height;
        },
    },
}];

const currentSelection = ref(origamis[0]);
const result = ref({});

const select = (itemName: string) => {
    const origami = origamis.find((origami) => origami.name === itemName);
    currentSelection.value = origami;
};
</script>

<template>
    <header>
        <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

        <div class="wrapper">
            <Form :origami="currentSelection" @change="(value) => result = value" />
        </div>
    </header>

    <aside>
        <Menu
            :items="origamis"
            :selected="currentSelection.name"
            @change="select"
        />
    </aside>
    <section>
        <Plan
            :selected="currentSelection.name"
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
        flex-wrap: wrap;
    }
}
</style>
