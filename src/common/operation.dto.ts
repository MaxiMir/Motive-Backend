export const OPERATIONS = ['insert', 'delete'] as const;

export type OperationDto = (typeof OPERATIONS)[number];
