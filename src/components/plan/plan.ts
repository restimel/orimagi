import { computed, reactive } from 'vue';

function minMax(value: number = 0, min: number, max: number) {
    if (!Number.isFinite(value)) {
        return min;
    }

    if (value > max) {
        return max;
    }

    if (value < min) {
        return min;
    }

    return value;
}

export function page(props: PlanProps) {
    const paperWidth = computed(() => props.dimensions.paperWidth || 0);
    const paperHeight = computed(() => props.dimensions.paperWidth || 0);

    const ratio = computed(() => {
        const width = paperWidth.value;
        const height =  paperHeight.value;

        return  Math.min(1000 / width, 1000 / height, 1e12) || 1e-15;
    });
    const pWidth = computed(() => {
        return paperWidth.value * ratio.value || 0;
    });
    const pHeight = computed(() => {
        return paperHeight.value * ratio.value || 0;
    });

    return reactive({
        paperWidth,
        paperHeight,
        ratio,
        pWidth,
        pHeight,
    });
}

export function properties(props: PlanProps) {
    const width = computed(() => {
        return props.dimensions.width || 0;
    });
    const height = computed(() => {
        return props.dimensions.height || 0;
    });
    const depth = computed(() => {
        return props.dimensions.depth || 0;
    });
    const lip = computed(() => {
        return props.dimensions.lip || 0;
    });
    const dividers = computed(() => {
        return props.dimensions.dividers || 0;
    });
    const marginA = computed(() => {
        return props.dimensions.marginA || 0;
    });
    const marginB = computed(() => {
        return props.dimensions.marginB || 0;
    });
    const ratio = computed(() => {
        return minMax(props.dimensions.ratio, 0, 100);
    });

    return reactive({
        width,
        height,
        depth,
        lip,
        dividers,
        marginA,
        marginB,
        ratio,
    });
}
