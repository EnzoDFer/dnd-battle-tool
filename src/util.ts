/**
 * Filters out the first instance of a given element from an array
 * @param arr The input array
 * @param element The element to be removed from the array
 * @returns The filtered array
 */
export function filterFirstInstance<T>(arr: T[], element: T): T[] {
  let copyArr: T[] = [...arr];
  let index: number = copyArr.indexOf(element);
  if (index !== -1) {
    copyArr.splice(index, 1);
  }
  return copyArr;
}
