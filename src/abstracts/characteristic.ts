export const CHARACTERISTICS = ['motivation', 'creativity'] as const;

export type Characteristic = typeof CHARACTERISTICS[number];
