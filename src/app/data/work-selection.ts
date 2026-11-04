import { Injectable, computed, signal } from '@angular/core';
import { coverflowOrder, pieces, works } from './works.data';
import { wrapIndex } from '../coverflow/coverflow.model';
@Injectable({ providedIn: 'root' })
export class WorkSelection {
  readonly pieces = pieces;
  readonly selectedIndex = signal(0);
  readonly selectedWorkIndex = computed(() => coverflowOrder[wrapIndex(this.selectedIndex(), pieces.length)]);
  readonly selectedWork = computed(() => works[this.selectedWorkIndex()]);
  selectWork(index: number): void {
    const selected = coverflowOrder.findIndex(item => item === index);
    if (selected >= 0) this.selectedIndex.set(selected);
  }
}
