
type OrigamiItem = {
    name: string;
    icon: VNode;
    properties: Properties;
    dimension: Dimension;
};

type Properties = {
    width: boolean | string;
    depth: boolean | string;
    height: boolean | string;
    lip?: boolean | string;
    dividers?: boolean | string;
    ratio?: boolean | string;
    marginA?: boolean | string;
    marginB?: boolean | string;
};

type PropertyValues = {
    [name in keyof Properties]: number;
};

type Dimension = Record<string, (dim: PropertyValues) => number>;
type DimensionValues = {
    [name in keyof Dimension]: number;
};

type AllValues = DimensionValues & PropertyValues;
