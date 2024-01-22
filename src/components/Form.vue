<script setup lang="ts">
import { computed, defineEmits, reactive, watch } from 'vue';

const props = defineProps<{
    origami: OrigamiItem;
}>();

const emit = defineEmits<{
    change: AllValues;
}>();

function defaultValue(value: boolean | string | undefined, defaultValue: string): string {
    if (!value) {
        return '';
    }

    if (typeof value === 'string') {
        return value;
    }

    return defaultValue;
}

const title = computed(() => props.origami.name);
const propertyName = computed(() => {
    const properties = props.origami.properties;

    return {
        width: defaultValue(properties.width, 'Width'),
        depth: defaultValue(properties.depth, 'Depth'),
        height: defaultValue(properties.height, 'Height'),
        lip: defaultValue(properties.lip, 'Lip size'),
        marginA: defaultValue(properties.marginA, 'Margin'),
        marginB: defaultValue(properties.marginB, 'Margin'),
    };
});
const properties: DimensionValues = reactive({
    width: 1,
    depth: 1,
    height: 1,
    lip: 0,
    dividers: 0,
    marginA: 0,
    marginB: 0,
});
const displayedProperties = computed(() => {
    console.log(Object.entries(propertyName.value));
    return Object.entries(propertyName.value).reduce((list, [key, value]) => {
        console.log(key, value);
        if (value) {
            list.push(key);
        }
        return list;
    }, []);
});

function computeDimension(dim: DimensionValues) {
    const result = Object.entries(props.origami.dimension).map(([key, computeValue]) => {
        return [key, computeValue(dim)];
    });

    return result;
}

const dimensionValues = computed(() => {
    return computeDimension(properties)
})

function changeDimension(dimName: string, oldValue: number, newValue: number, currentProperties = properties, protection = 20) {
    const ratio = newValue / oldValue;
    const newProperties = {
        width: currentProperties.width * ratio,
        depth: currentProperties.depth * ratio,
        height: currentProperties.height * ratio,
        lip: currentProperties.lip * ratio,
        dividers: currentProperties.dividers * ratio,
        marginA: currentProperties.marginA * ratio,
        marginB: currentProperties.marginB * ratio,
    };

    const dimensionSize = computeDimension(newProperties);
    const propValue = dimensionSize.find(([dimSizeName]) => dimSizeName === dimName)[1];
    const resultRatio = propValue / newValue;

    if (protection <= 0 || isNaN(resultRatio) || Math.abs(resultRatio - 1) < 1e-6) {
        properties.width = newProperties.width;
        properties.depth = newProperties.depth;
        properties.height = newProperties.height;
        properties.lip = newProperties.lip;
        properties.dividers = newProperties.dividers;
        properties.marginA = newProperties.marginA;
        properties.marginB = newProperties.marginB;
    } else {
        changeProperty(dimName, propValue, newValue, currentProperties, protection - 1);
    }
}

watch(dimensionValues, () => {
    const results = {
        ...properties,
    };
    dimensionValues.value.forEach(([key, value]) => results[key] = value);

    emit('change', results);
}, { immediate: true })
</script>

<template>
    <div class="greetings">
        <h1 class="green">{{ title }}</h1>
        <fieldset>
            <legend>Properties</legend>
            <label
                v-for="(name) of displayedProperties"
                :key="name"
            >
                {{propertyName[name]}}
                <input
                    :value="properties[name]"
                    @input="(evt) => {
                        properties[name] = +evt.currentTarget.value;
                    }"
                >
            </label>
        </fieldset>
        <fieldset>
            <legend>Dimensions</legend>
            <label
                v-for="([name, value]) of dimensionValues"
                :key="name"
            >
                {{name}}
                <input
                    :value="value"
                    @change="(evt) => {
                        changeDimension(name, value, +evt.currentTarget.value);
                    }"
                >
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
