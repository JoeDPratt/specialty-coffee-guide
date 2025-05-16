export const REGIONS = {
    UK: {
        code: 'UK',
        label: 'United Kingdom',
        flag: 'GB',
        currency: 'GBP',
        symbol: '£',
        locale: 'en-GB',
        smallBagSize: 250,
        largeBagSize: 1000,
        smallWeightUnit: 'g',
        largeWeightUnit: 'kg',
    },
    US: {
        code: 'US',
        label: 'United States',
        flag: 'US',
        currency: 'USD',
        symbol: '$',
        locale: 'en-US',
        smallBagSize: 341,    // 12oz
        largeBagSize: 907,   // 2lb fallback, same tolerance
        smallWeightUnit: 'oz',
        largeWeightUnit: 'lb',
    },
} as const;

export type RegionCode = keyof typeof REGIONS;