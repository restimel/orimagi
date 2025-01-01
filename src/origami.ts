import _ from '@/i18n';
import CardHolderIcon from '@/components/icons/IconCardHolder.vue';
import CardsHolderIcon from '@/components/icons/IconCardsHolder.vue';
import KataIcon from '@/components/icons/IconKata.vue';
import LidIcon from '@/components/icons/IconLid.vue';
import MasuIcon from '@/components/icons/IconMasu.vue';

const origamis: OrigamiItem[] = [{
    id: 'Masu',
    name: () => _.value('Masu box'),
    icon: MasuIcon,
    properties: {
        width: true,
        height: true,
        depth: true,
    },
    dimension: {
        paperWidth: (dim: PropertyValues) => {
            return (dim.width + dim.depth + 4 * dim.height) / Math.SQRT2;
        },
        paperHeight: (dim: PropertyValues) => {
            return (dim.width + dim.depth + 4 * dim.height) / Math.SQRT2;
        },
        cubeVolume: (dim: PropertyValues) => {
            return dim.width * dim.depth * dim.height;
        },
    },
    dimensionNames: {
        paperWidth: () => _.value('Paper width'),
        paperHeight: () => _.value('Paper height'),
        cubeVolume: () => _.value('Volume'),
    },
    validate: (values: PropertyValues): string => {
        if (values.width <= 0 || values.height <= 0 || values.depth <= 0) {
            return _.value('Properties should be positive numbers');
        }

        return '';
    },
    resource: 'https://www.youtube.com/watch?v=WYvvkrYawpk',
}, {
    id: 'Lid',
    name: () => _.value('lid box'),
    icon: LidIcon,
    properties: {
        width: true,
        height: true,
        depth: true,
        lip: true,
        marginA: () => _.value('lid oversize (to close correctly)'),
        ratio: () => _.value('lid split (%)'),
    },
    dimension: {
        paperWidth: (dim: PropertyValues) => {
            return dim.depth + 2 * dim.height + 2 * (dim.lip || 0);
        },
        paperHeight: (dim: PropertyValues) => {
            return 2 * dim.width + 2 * dim.height + (dim.marginA || 0);
        },
        cubeVolume: (dim: PropertyValues) => {
            return dim.width * dim.depth * dim.height;
        },
    },
    dimensionNames: {
        paperWidth: () => _.value('Paper width'),
        paperHeight: () => _.value('Paper height'),
        cubeVolume: () => _.value('Volume'),
    },
    validate: (values: PropertyValues) => {
        const vLip = values.lip;
        const lip = vLip ?? 0;
        const depth = values.depth;
        const width = values.width;
        const height = values.height;
        const vMarginA = values.marginA;
        const marginA = vMarginA ?? 0;
        const vLidRatio = values.ratio;
        const lidRatio = vLidRatio ?? 0;

        if (width <= 0 || height <= 0 || depth <= 0
            || typeof vLip !== 'number' || lip < 0
            || typeof vMarginA !== 'number' || marginA < 0
            || typeof vLidRatio !== 'number' || lidRatio < 0
        ) {
            return _.value('Properties should be positive numbers');
        }

        if (height > depth) {
            return _.value('"Depth" should be greater than "height"');
        }

        if (lip > depth) {
            return _.value('"Lip" should be lower than "depth"');
        }

        if (lidRatio < 0 || lidRatio > 100) {
            return _.value('"Lid ratio" should be between 0 and 100');
        }

        const maxMargin = width * lidRatio / 100;
        if (marginA > maxMargin) {
            return _.value('With the current ratio, the "Lid oversize" will be over the "width" of the box');
        }

        return '';
    },
    resource: '',
}, {
    id: 'KataDivider',
    name: () => _.value('Kata divider'),
    icon: KataIcon,
    properties: {
        width: true,
        height: true,
        depth: () => _.value('First insert'),
        marginA: () => _.value('Second insert'),
        marginB: () => _.value('Third insert'),

    },
    dimension: {
        paperWidth: (dim: PropertyValues) => {
            const marginA = dim.marginA ?? 0;
            const marginB = dim.marginB ?? 0;
            return dim.depth + marginA + marginB + (marginB ? 4 : 2) * dim.height;
        },
        paperHeight: (dim: PropertyValues) => {
            return dim.width + 2 * dim.height;
        },
    },
    dimensionNames: {
        paperWidth: () => _.value('Paper width'),
        paperHeight: () => _.value('Paper height'),
        cubeVolume: () => _.value('Volume'),
    },
    validate: (values: PropertyValues) => {
        if (values.width <= 0 || values.height <= 0 || values.depth <= 0 || values.marginA! <= 0 || values.marginB! < 0) {
            return _.value('Properties should be positive numbers');
        }

        return '';
    },
    resource: '',
}, {
    id: 'VCardHolder',
    name: () => _.value('V card holder'),
    icon: CardHolderIcon,
    properties: {
        width: true,
        height: false,
        depth: true,
    },
    dimension: {
        paperWidth: (dim: PropertyValues) => {
            return 4 * dim.width + 2 * dim.depth;
        },
        paperHeight: (dim: PropertyValues) => {
            return dim.width;
        },
    },
    dimensionNames: {
        paperWidth: () => _.value('Paper width'),
        paperHeight: () => _.value('Paper height'),
        cubeVolume: () => _.value('Volume'),
    },
    validate: (values: PropertyValues) => {
        if (values.width <= 0 || values.depth <= 0) {
            return _.value('Properties should be positive numbers');
        }

        if (values.depth > values.width) {
            return _.value('"Depth" should be lower than "width"');
        }

        return '';
    },
    resource: 'https://www.youtube.com/watch?v=fEgUx_0-1Qs',
}, {
    id: 'CardsHolder',
    name: () => _.value('Cards holder'),
    icon: CardsHolderIcon,
    properties: {
        width: true,
        height: true,
        depth: true,
        marginA: () => _.value('Band height'),
        marginB: () => _.value('Overlapping'),
    },
    dimension: {
        paperWidth: (dim: PropertyValues) => {
            return 2 * dim.width + 2 * dim.depth + (dim.marginB ?? 0);
        },
        paperHeight: (dim: PropertyValues) => {
            return dim.height + 2 * (dim.marginA ?? 0);
        },
        cubeVolume:  (dim: PropertyValues) => {
            return dim.width * dim.height * dim.depth;
        },
    },
    dimensionNames: {
        paperWidth: () => _.value('Paper width'),
        paperHeight: () => _.value('Paper height'),
        cubeVolume: () => _.value('Volume'),
    },
    validate: (values: PropertyValues) => {
        if (values.width <= 0 || values.height <= 0 || values.depth <= 0
            || values.marginA! <= 0 || values.marginB! <= 0
        ) {
            return _.value('Properties should be positive numbers');
        }

        if (2 * values.marginA! > values.height) {
            return _.value('"Band height" is too big relatively to "height"');
        }

        if (values.marginB! > values.width) {
            return _.value('"Overlapping" should be lower than "width"');
        }

        return '';
    },
    resource: '',
}];

export default origamis;

export function getOrigami(id: string) {
    const origami = origamis.find((item) => {
        return item.id === id;
    });

    return origami;
}

export function getIcon(id: string) {
    const origami = getOrigami(id);

    return origami?.icon;
}
