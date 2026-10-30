import { ReferencePlateItem } from '../types/theology';
import { REFERENCE_PLATES_PART_1 } from './referencePlatesPart1';
import { REFERENCE_PLATES_PART_2 } from './referencePlatesPart2';

export const ALL_REFERENCE_PLATES: ReferencePlateItem[] = [
  ...REFERENCE_PLATES_PART_1,
  ...REFERENCE_PLATES_PART_2,
];
