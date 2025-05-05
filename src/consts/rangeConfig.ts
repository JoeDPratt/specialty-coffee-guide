// src/consts/rangeConfig.ts
export interface RangeConfig {
    min: number;
    max: number;
    step: number;
    unit?: string;
}

export const cupScoreRange: RangeConfig = { min: 75, max: 100, step: 1, unit: 'pts' };
export const priceRange: RangeConfig = { min: 0, max: 200, step: 1, unit: '$' };
