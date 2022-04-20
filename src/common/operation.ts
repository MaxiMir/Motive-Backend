export const OPERATIONS = ['insert', 'delete'] as const;

export type Operation = typeof OPERATIONS[number];
