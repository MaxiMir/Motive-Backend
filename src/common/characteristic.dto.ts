export const CHARACTERISTICS = ['motivation', 'creativity'] as const;

export type CharacteristicDto = typeof CHARACTERISTICS[number];
