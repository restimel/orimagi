<script setup lang="ts">
import { computed, ref } from 'vue';

const title = 'Masu';

const boxWidth = ref(0);
const boxDepth = ref(0);
const boxHeight = ref(0);

const paperWidth = computed(() => {
  const L = +boxWidth.value;
  const l = +boxDepth.value;
  const h = +boxHeight.value;
  return (L + l + 4*h) / Math.SQRT2;
});
const paperHeight = computed(() => {
  return paperWidth.value;
});

const resize = (size: number) => {
  const currentSize = paperHeight.value;
  const ratio = size / currentSize;
  const L = boxWidth.value * ratio;
  const l = boxDepth.value * ratio;
  const h = boxHeight.value * ratio;

  boxWidth.value = L;
  boxDepth.value = l;
  boxHeight.value = h;
}
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ title }}</h1>
    <fieldset>
      <legend>Paper dimension</legend>
      <label>
        Width:
        <input
          :value="paperWidth"
          @change="(evt) => resize(+evt.currentTarget.value)"
        />
      </label>
      <label>
        Height:
        <input
          :value="paperHeight"
          @change="(evt) => resize(+evt.currentTarget.value)"
        />
      </label>
    </fieldset>
    <fieldset>
      <legend>Box dimension</legend>
      <label>
        Base width:
        <input v-model="boxWidth">
      </label>
      <label>
        Base depth:
        <input v-model="boxDepth">
      </label>
      <label>
        Box height:
        <input v-model="boxHeight">
      </label>
    </fieldset>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}

label {
  display: block;
}
</style>
