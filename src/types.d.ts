
type OrigamiItem = {
    id: string;
    name: string;
    icon: VNode;
    properties: Properties;
    dimension: Dimension;
};

type OrigamiSaved = {
    id: number;
    name: string;
    type: string;
    values: PropertyValues;
}

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

type PlanProps = {
    dimensions: AllValues;
};

type Point = [number, number];
type Line = [Point, Point];
