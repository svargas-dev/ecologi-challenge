import { getDateUnixTime } from '@/utils/date';

/**
 * Fetch tree planting data from Ecologi
 * @returns Array<[numberOfTrees: number, unixTime: number]>
 */
const fetchTreeData = async () => {
  const res = await fetch('https://x.api.ecologi.com/trees');
  return res.json();
};

/**
 * Fetches Ecologi tree planting data and returns array of
 * number of trees planted per day
 * @returns Array<[unixDateTime: number, numberOfTrees: number]>
 */
export const processTreeData = async (): Promise<[number, number][]> => {
  const { data } = await fetchTreeData();

  // Get number of trees planted per day
  // Using Map data type so we can use a number, dateUnixTime, as a key and
  // make use performance advantage with large data sets
  const treeData: Map<number, number> = data.reduce((acc: Map<number, number>, treeTuple: [number, number]) => {
    const dateUnixTime = getDateUnixTime(treeTuple[1]);

    // Using a functional approach we could copy the acc e.g., `const newAcc = new Map(acc)`
    // before modifying but it has a significant performance impact.
    // If pursing a more functional approach immutable.js may be a better option
    const currentValue = acc.get(dateUnixTime);
    if (typeof currentValue === 'number') {
      acc.set(dateUnixTime, currentValue + Number(treeTuple[0]));
    } else {
      acc.set(dateUnixTime, Number(treeTuple[0]));
    }

    return acc;
  }, new Map());

  // chronologically sorted array
  return Array.from(treeData.entries()).sort((a, b) => a[0] - b[0]);
};

export default processTreeData;
