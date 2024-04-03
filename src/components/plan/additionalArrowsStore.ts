import { computed, ref } from 'vue';
import type { ComputedRef, Ref } from 'vue';

type AdditionalArrow = Ref<ArrowDef>;

const additionalArrows = ref<ComputedRef<ArrowDef>[]>([]);
const refArrow1 = ref<AdditionalArrow | null>(null);

export function clear() {
    additionalArrows.value = [];
    refArrow1.value = null;
}

export function arrowId(arrow: ArrowDef): string {
    return `arrow-${arrow.x}-${arrow.y}-${arrow.x2}-${arrow.y2}-${arrow.level || 1}`;
}

export function add(arrow: AdditionalArrow) {
    const ref1 = refArrow1.value as AdditionalArrow | null;

    if (!ref1) {
        refArrow1.value = arrow as any;
        return;
    }

    const ref2 = arrow;

    if (ref1 === ref2) {
        refArrow1.value = null;
        return;
    }

    /* if vectors are aligned create a common arrow */
    if (check(ref1.value, ref2.value)) {
        additionalArrows.value.push(
            computed<ArrowDef>(() => {
                return create(ref1.value!, ref2.value);
            })
        );

        refArrow1.value = null;
    } else {
        refArrow1.value = arrow as any;
    }
}

function check(arrow1: ArrowDef, arrow2: ArrowDef): boolean {
    const a1 = (arrow1.y - arrow1.y2) / (arrow1.x - arrow1.x2);
    const b1 = arrow1.y - a1 * arrow1.x;
    const a2 = (arrow2.y - arrow2.y2) / (arrow2.x - arrow2.x2);
    const b2 = arrow2.y - a2 * arrow2.x;

    return a1 === a2 && b1 === b2;
}

function create(arrow1: ArrowDef, arrow2: ArrowDef): ArrowDef {
    const reverseOffset = arrow1.reverseOffset;
    const min1 = arrow1.x === arrow2.x
        ? arrow1.y < arrow2.y
        : arrow1.x < arrow2.x;
    const x = min1 ? arrow1.x : arrow2.x;
    const y = min1 ? arrow1.y : arrow2.y;
    const x2 = min1 ? arrow2.x2 : arrow1.x2;
    const y2 = min1 ? arrow2.y2 : arrow1.y2;
    const ratio = arrow1.text / Math.sqrt((arrow1.x - arrow1.x2) ** 2 + (arrow1.y - arrow1.y2) ** 2);
    const text = ratio * Math.sqrt((x - x2) ** 2 + (y - y2) ** 2);

    const newArrow: ArrowDef = {
        x,
        y,
        x2,
        y2,
        reverseOffset,
        text,
        level: Math.max(arrow1.level || 1, arrow2.level || 1) +1,
        id: '',
    };
    newArrow.id = arrowId(newArrow);

    return newArrow;
}

export function remove(arrow: AdditionalArrow) {
    const arrows = additionalArrows.value;
    const id = arrowId(arrow.value);

    const index = arrows.findIndex((refArrow) => arrowId(refArrow.value) === id);

    if (index !== -1) {
        arrows.splice(index, 1);
    }
}

export default additionalArrows;
