// Date Utils
// in realworld app I'd probably use a date library such as luxon

export const getISODate = (unixTime: number): string => new Date(unixTime * 1000).toISOString().split('T')[0];

export const getDateUnixTime = (unixTime: number): number => new Date(`${getISODate(unixTime)}`).valueOf() / 1000;

/**
 * returns current unix timestamp
 */
export const getCurrentTimestamp = (): number => Math.floor(Date.now() / 1000);
