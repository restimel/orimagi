
type OrigamiItem = {
    name: string;
    icon: VNode;
    properties: Dimension;
    dimension: Record<string, (dim: DimensionValues) => Record<keyof size, number>>;
};

type Dimension = {
    width: boolean | string;
    depth: boolean | string;
    height: boolean | string;
    lip?: boolean | string;
    dividers?: boolean | string;
    ratio?: boolean | string;
    marginA?: boolean | string;
    marginB?: boolean | string;
};

type DimensionValues = {
    [name in keyof Dimension]: number;
};

type AllValues = Dimension & DimensionValues;
