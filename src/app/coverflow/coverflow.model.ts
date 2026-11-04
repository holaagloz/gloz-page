export interface CoverflowPiece {
  readonly id: string;
  readonly image: string;
  readonly title: string;
  readonly category: string;
  readonly alt: string;
  readonly position?: string;
}

export function wrapIndex(index: number, count: number): number {
  return count > 0 && Number.isFinite(index) ? ((Math.trunc(index) % count) + count) % count : 0;
}

/** Signed shortest route through the cyclic set. */
export function relativeSlot(index: number, active: number, count: number): number {
  const distance = wrapIndex(index - active, count);
  return distance > (count - 1) / 2 ? distance - count : distance;
}

/** Extra physical copies stay outside the visible window while recycling. */
export function physicalCount(count: number): number {
  return count <= 1 ? count : Math.ceil(12 / count) * count;
}
