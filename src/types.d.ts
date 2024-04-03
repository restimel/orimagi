/* {{{ Origami description */

type OrigamiItem = {
    id: string;
    name: () => string;
    icon: VNode;
    properties: Properties;
    dimension: Dimension;
    dimensionNames: Record<keyof Dimension, () => string>;
    validate: (values: PropertyValues) => boolean;
    resource: string;
};

type OrigamiSaved = {
    id: number;
    name: string;
    type: string;
    values: PropertyValues;
}

type Properties = {
    width: boolean | (() => string);
    depth: boolean | (() => string);
    height: boolean | (() => string);
    lip?: boolean | (() => string);
    dividers?: boolean | (() => string);
    ratio?: boolean | (() => string);
    marginA?: boolean | (() => string);
    marginB?: boolean | (() => string);
};

type PropertyNames = {
    [name in keyof Properties]: string;
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

/* }}} */
/* {{{ OrigamiSettings */

type SettingsType =
    | 'arrow'
    | 'cut'
    | 'cutLine'
    | 'fold'
    | 'mark'
    | 'page'
    | 'point'
;

type SettingsDisplay = Record<SettingsType, boolean>;
type SettingsLabel = Record<SettingsType, () => string>;

/* }}} */
/* {{{ Arrows */

type ArrowDef = {
    x: number;
    y: number;
    x2: number;
    y2: number;
    text: number;
    reverseOffset: boolean;
    level: number;
    id: string;
};

/* }}} */
/* {{{ i18n */

type Locale = 'en' | 'fr';
type I18nItem = Record<Locale, string>;

/* }}} */
