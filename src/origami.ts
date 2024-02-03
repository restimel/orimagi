import _ from '@/i18n';
import CardHolderIcon from '@/components/icons/IconCardHolder.vue';
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
        paperVolume: (dim: PropertyValues) => {
            return dim.width * dim.depth * dim.height;
        },
    },
    dimensionNames: {
        paperWidth: () => _.value('Paper width'),
        paperHeight: () => _.value('Paper height'),
        paperVolume: () => _.value('Volume'),
    },
    validate: (values: PropertyValues) => {
        return values.width > 0 && values.height > 0 && values.depth > 0;
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
        marginA: 'lid oversize (to close correctly)',
        ratio: 'lid split (%)',
    },
    dimension: {
        paperWidth: (dim: PropertyValues) => {
            return dim.width + 2 * dim.height + 2 * (dim.lip || 0);
        },
        paperHeight: (dim: PropertyValues) => {
            return 2 * dim.depth + 2 * dim.height + (dim.marginA || 0);
        },
        paperVolume: (dim: PropertyValues) => {
            return dim.width * dim.depth * dim.height;
        },
    },
    dimensionNames: {
        paperWidth: () => _.value('Paper width'),
        paperHeight: () => _.value('Paper height'),
        paperVolume: () => _.value('Volume'),
    },
    validate: (values: PropertyValues) => {
        const lip = values.lip;
        const marginA = values.marginA;
        const lidRatio = values.ratio;

        return values.width > 0 && values.height > 0 && values.depth > 0
            && typeof lip === 'number' && lip >=0 && lip <= values.width
            && typeof marginA === 'number' && marginA >=0 && marginA <= values.height
            && typeof lidRatio === 'number' && lidRatio >=0 && lidRatio <= 100;
    },
    resource: '',
}, {
    id: 'CardHolder',
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
        paperVolume: () => _.value('Volume'),
    },
    validate: (values: PropertyValues) => {
        return values.width > 0 && values.depth > 0
            && values.depth <= values.width;
    },
    resource: 'https://www.youtube.com/watch?v=fEgUx_0-1Qs',
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
