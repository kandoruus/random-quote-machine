export const getNewRandomArrayElement = <T, >(arr: T[], prevRandElement: T | null): T => {
  const newArr: T[] = arr.filter(element => element !== prevRandElement);
  return newArr[Math.floor(Math.random() * newArr.length)];
}