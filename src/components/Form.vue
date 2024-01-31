<script setup lang="ts">
import _ from '@/i18n';
import { computed, defineEmits, reactive, ref, watch } from 'vue';
import IconUnlock from './icons/IconUnlock.vue';
import IconLock from './icons/IconLock.vue';

const props = defineProps<{
    origami: OrigamiItem;
    values: PropertyValues;
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
const values = computed(() => props.values);
const propertyName = computed<Properties>(() => {
    const properties = props.origami.properties;

    return {
        width: defaultValue(properties.width, _.value('Width')),
        depth: defaultValue(properties.depth, _.value('Depth')),
        height: defaultValue(properties.height, _.value('Height')),
        lip: defaultValue(properties.lip, _.value('Lip size')),
        marginA: defaultValue(properties.marginA, _.value('Margin')),
        marginB: defaultValue(properties.marginB, _.value('Margin')),
        ratio: defaultValue(properties.ratio, _.value('Margin')),
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

const lockProperties = ref<Set<string>>(new Set());

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

function scale(property: keyof PropertyValues, ratio: number): number {
    const value = properties[property] || 0;

    if (lockProperties.value.has(property)) {
        return value;
    }

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
        width: scale('width', ratio),
        depth: scale('depth', ratio),
        height: scale('height', ratio),
        lip: scale('lip', ratio),
        dividers: scale('dividers', ratio),
        marginA: scale('marginA', ratio),
        marginB: scale('marginB', ratio),
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

watch(values, () => {
    for (const [key, value] of (Object.entries(values.value) as Array<[keyof PropertyValues, number]>)) {
        const oldValue = properties[key];

        if (oldValue !== undefined && oldValue !== value) {
            properties[key] = value;
        }
    }
});

watch([properties, title], () => {
    const results: AllValues = {
        ...properties,
    };
    dimensionValues.value.forEach(([key, value]) => results[key] = value);

    emit('change', results);
}, { immediate: true})
</script>

<template>
    <div class="main-form">
        <h1 class="green">{{ title }}</h1>
        <fieldset>
            <legend>
                {{_('Properties')}}
            </legend>
            <label v-for="(name) of displayedProperties"
                class="form-label"
                :key="name"
            >
                {{propertyName[name]}}
                <input
                    :value="properties[name]"
                    :disabled="lockProperties.has(name)"
                    @input="(evt) => {
                        const el = evt.currentTarget as HTMLInputElement;
                        properties[name] = parseFloat(el.value) || 0;
                    }"
                >

                <IconLock v-if="lockProperties.has(name)" class="btn-icon active" @click="() => lockProperties.delete(name)" />
                <IconUnlock v-else class="btn-icon" @click="() => lockProperties.add(name)" />
            </label>
        </fieldset>
        <fieldset>
            <legend>
                {{_('Dimensions')}}
            </legend>
            <label v-for="([name, value]) of dimensionValues"
                class="form-label"
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
                <span></span>
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

.main-form h1,
.main-form h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .main-form h1,
  .main-form h3 {
    text-align: left;
  }
}

.form-label {
  display: grid;
  grid-template-columns: max-content 1fr max-content;
  gap: 5px;
  align-items: center;
  margin-bottom: 5px;
}

fieldset {
    border-radius: 10px;
    margin-bottom: 20px;
}
</style>
