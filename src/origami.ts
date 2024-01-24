import LidIcon from '@/components/icons/IconLid.vue';
import MasuIcon from '@/components/icons/IconMasu.vue';

const origamis: OrigamiItem[] = [{
    id: 'Masu',
    name: 'Masu box',
    icon: MasuIcon,
    properties: {
        width: true,
        height: true,
        depth: true,
    },
    dimension: {
        'Paper width': (dim: PropertyValues) => {
            return (dim.width + dim.depth + 4 * dim.height) / Math.SQRT2;
        },
        'Paper height': (dim: PropertyValues) => {
            return (dim.width + dim.depth + 4 * dim.height) / Math.SQRT2;
        },
        'Volume': (dim: PropertyValues) => {
            return dim.width * dim.depth * dim.height;
        },
    },
}, {
    id: 'Lid',
    name: 'lid box',
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
        'Paper width': (dim: PropertyValues) => {
            return dim.width + 2 * dim.height + 2 * (dim.lip || 0);
        },
        'Paper height': (dim: PropertyValues) => {
            return 2 * dim.depth + 2 * dim.height + 2 * (dim.lip || 0) + (dim.marginA || 0);
        },
        'Volume': (dim: PropertyValues) => {
            return dim.width * dim.depth * dim.height;
        },
    },
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
