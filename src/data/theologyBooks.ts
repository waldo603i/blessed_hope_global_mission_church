import { TheologicalBookChapter } from '../types/theology';
import { BOOKS_PART_1 } from './booksPart1';
import { BOOKS_PART_2 } from './booksPart2';
import { BOOKS_PART_3 } from './booksPart3';

export const THEOLOGY_BOOKS: TheologicalBookChapter[] = [
  ...BOOKS_PART_1,
  ...BOOKS_PART_2,
  ...BOOKS_PART_3,
];
