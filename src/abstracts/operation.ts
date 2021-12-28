export const OPERATIONS = ['add', 'remove'] as const;

export type Operation = typeof OPERATIONS[number];
