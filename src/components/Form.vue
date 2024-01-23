<script setup lang="ts">
import { computed, defineEmits, reactive, watch } from 'vue';

const props = defineProps<{
    origami: OrigamiItem;
}>();

const emit = defineEmits<{
    change: [AllValues];
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
const propertyName = computed<Properties>(() => {
    const properties = props.origami.properties;

    return {
        width: defaultValue(properties.width, 'Width'),
        depth: defaultValue(properties.depth, 'Depth'),
        height: defaultValue(properties.height, 'Height'),
        lip: defaultValue(properties.lip, 'Lip size'),
        marginA: defaultValue(properties.marginA, 'Margin'),
        marginB: defaultValue(properties.marginB, 'Margin'),
        ratio: defaultValue(properties.ratio, 'Margin'),
    };
});

const properties: PropertyValues = reactive({
    width: 1,
    depth: 1,
    height: 1,
    lip: 0,
    dividers: 0,
    marginA: 0,
    marginB: 0,
    ratio: 50,
});

const displayedProperties = computed<Array<keyof Properties>>((): Array<keyof Properties> => {
    return Object.entries(propertyName.value).reduce((list, [key, value]) => {
        if (value) {
            list.push(key as keyof Properties);
        }
        return list;
    }, [] as Array<keyof Properties>);
});

function computeDimension(dim: PropertyValues): Array<[string, number]> {
    const result = Object.entries(props.origami.dimension).map(([key, computeValue]) => {
        return [key, computeValue(dim)] as [string, number];
    });

    return result;
}

const dimensionValues = computed(() => {
    return computeDimension(properties);
})

function scale(value: number = 0, ratio: number): number {
    const scaled = value * ratio;
    return Math.round(scaled * 1_000_000) / 1_000_000;
}

function reScale(dimName: string, originValue: number, targetValue: number, minMax?: [number, number], protection = 0) {
    if (!originValue) {
        return false;
    }

    const ratio = minMax ? (minMax[0] + minMax[1]) / 2 : targetValue / originValue;

    if (!Number.isFinite(ratio) || ratio < 0) {
        return false;
    }

    const newProperties = {
        width: scale(properties.width, ratio),
        depth: scale(properties.depth, ratio),
        height: scale(properties.height, ratio),
        lip: scale(properties.lip, ratio),
        dividers: scale(properties.dividers, ratio),
        marginA: scale(properties.marginA, ratio),
        marginB: scale(properties.marginB, ratio),
        ratio: properties.ratio,
    };

    const dimensionSize = computeDimension(newProperties);
    const propValue = dimensionSize.find(([dimSizeName]) => dimSizeName === dimName)?.[1] || 0;
    const resultRatio = !targetValue ? 1 : propValue / targetValue;

    if (Number.isFinite(resultRatio) && Math.abs(resultRatio - 1) < 1e-6) {
        properties.width = newProperties.width;
        properties.depth = newProperties.depth;
        properties.height = newProperties.height;
        properties.lip = newProperties.lip;
        properties.dividers = newProperties.dividers;
        properties.marginA = newProperties.marginA;
        properties.marginB = newProperties.marginB;
        properties.ratio = newProperties.ratio;
        return true;
    }

    if (protection < 30) {
        const range: [number, number] = minMax ? minMax : [
            targetValue / originValue > 1 ? 1 : 0,
            targetValue / originValue > 1 ? 1e5 : 1,
        ];
        if (resultRatio > 1) {
            range[1] = ratio;
        } else {
            range[0] = ratio;
        }

        return reScale(dimName, originValue, targetValue, range, protection + 1);
    }
    return false;
}

watch([properties, title], () => {
    const results: AllValues = {
        ...properties,
    };
    dimensionValues.value.forEach(([key, value]) => results[key] = value);

    emit('change', results);
}, { immediate: true})
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
                        const el = evt.currentTarget as HTMLInputElement;
                        properties[name] = parseFloat(el.value) || 0;
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
                        const el = evt.currentTarget as HTMLInputElement;
                        reScale(name, value, parseFloat(el.value) || 0);
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
